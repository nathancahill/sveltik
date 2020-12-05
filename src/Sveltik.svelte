<script>
    import {
        isEqual,
        pick,
        pickBy,
        isEmpty,
        mapValues,
        keys,
        merge,
        minBy,
        toPairs,
    } from 'lodash-es'
    import { onMount, setContext, tick } from 'svelte'
    import { readable, writable } from 'svelte/store'

    export let enableReinitialize = false
    export let initialStatus = undefined

    export let initialErrors = {}
    export let initialTouched = {}
    export let initialWarnings = {}
    export let initialValues = {}

    export let onReset = () => {}
    export let onSubmit = () => {}

    export let validate = () => ({})

    export let validateOnBlur = true
    export let validateOnChange = true
    export let validateOnMount = false

    const values = writable(initialValues)
    const errors = writable(initialErrors)
    const warnings = writable(initialWarnings)
    const touched = writable(initialTouched)
    const validators = writable({})
    const markers = writable({})

    setContext('values', values)
    setContext('errors', errors)
    setContext('warnings', warnings)
    setContext('touched', touched)
    setContext('validators', validators)
    setContext('markers', markers)

    setContext('initialErrors', initialErrors)
    setContext('initialTouched', initialTouched)
    setContext('initialValues', initialValues)
    setContext('initialWarnings', initialWarnings)

    let isSubmitting = false
    let isValidating = false
    let status = initialStatus
    let submitAttemptCount = 0
    let submitFailureCount = 0
    let submitSuccessCount = 0

    $: isValid = isEmpty(pickBy($errors))
    $: isDirty = !isEqual($values, initialValues)

    $: {
        if (enableReinitialize) {
            values.set(initialValues)
        }
    }

    function scrollFirstErrorIntoView() {
        const errorMarkers = pick($markers, keys(pickBy($errors)))
        const scrollHeights = mapValues(errorMarkers, node => {
            const domRect = node.getBoundingClientRect()
            return domRect.y
        })

        const top = minBy(toPairs(scrollHeights), o => o[1])

        if (top) {
            $markers[top[0]].scrollIntoView()
        }
    }

    function resetForm(nextInitialState) {
        let nextValues = initialValues
        let nextErrors = initialErrors
        let nextTouched = initialTouched
        let nextStatus = initialStatus

        if (nextInitialState) {
            nextValues = nextInitialState.values || {}
            nextErrors = nextInitialState.errors || {}
            nextTouched = nextInitialState.touched || {}
            nextStatus = nextInitialState.status
        }

        values.set(nextValues)
        errors.set(nextErrors)
        touched.set(nextTouched)
        status = nextStatus
    }

    function setErrors(fields) {
        errors.set(fields)
    }

    function setFieldError(field, errorMsg) {
        errors.update(_e => ({ ..._e, [field]: errorMsg }))
    }

    function setFieldTouched(
        field,
        isTouched,
        shouldValidate = validateOnBlur,
    ) {
        touched.update(_t => ({ ..._t, [field]: isTouched }))

        if (isTouched && shouldValidate) {
            handleValidate()
        }
    }

    function setFieldValue(field, value, shouldValidate = validateOnChange) {
        values.update(_v => ({ ..._v, [field]: value }))

        if (shouldValidate) {
            handleValidate()
        }
    }

    function setFieldWarning(field, warningMsg) {
        warnings.update(_w => ({ ..._w, [field]: warningMsg }))
    }

    function setStatus(nextStatus) {
        status = nextStatus
    }

    function setSubmitting(nextIsSubmitting) {
        isSubmitting = nextIsSubmitting
    }

    function submitFailure(fields) {
        if (fields) {
            errors.set(fields)
        }

        isSubmitting = false
        submitFailureCount += 1
    }

    function submitSuccess() {
        isSubmitting = false
        submitSuccessCount += 1
    }

    function setTouched(fields, shouldValidate = validateOnBlur) {
        touched.set(fields)

        if (shouldValidate) {
            handleValidate()
        }
    }

    function setValues(fields, shouldValidate = validateOnChange) {
        values.set(fields)

        if (shouldValidate) {
            handleValidate()
        }
    }

    function setWarnings(fields) {
        warnings.set(fields)
    }

    function submitForm() {
        if (isValid) {
            const result = handleSubmit()
            return Promise.resolve(result)
        } else {
            return Promise.reject()
        }
    }

    function validateField(field) {
        handleValidate($values, field)
    }

    function validateForm(nextValues = $values) {
        handleValidate(nextValues)
    }

    const bag = {
        resetForm,
        setErrors,
        setFieldError,
        setFieldTouched,
        setFieldValue,
        setFieldWarning,
        setStatus,
        setSubmitting,
        setTouched,
        setValues,
        setWarnings,
        submitFailure,
        submitForm,
        submitSuccess,
        validateField,
        validateForm,
        scrollFirstErrorIntoView,
    }

    const getBag = () => ({
        errors: $errors,
        touched: $touched,
        values: $values,
        warnings: $warnings,
        ...bag,
    })

    function handleBlur({ target: { name } }) {
        touched.update(_t => ({ ..._t, [name]: true }))

        if (validateOnBlur) {
            handleValidate()
        }
    }

    function handleInput({ target }) {
        const { name, type, checked, value } = target
        let nextValue = value

        if (type === 'range' || type === 'number') {
            nextValue = nextValue === '' ? undefined : +nextValue
        } else if (type === 'select-multiple') {
            nextValue = [].map.call(
                target.querySelectorAll(':checked'),
                option => option.value,
            )
        } else if (type === 'checkbox') {
            nextValue = checked
        }

        values.update(_v => ({ ..._v, [name]: nextValue }))

        if (validateOnChange) {
            handleValidate()
        }
    }

    function handleReset() {
        isSubmitting = false
        isValidating = false
        status = initialStatus
        submitAttemptCount = 0
        submitFailureCount = 0
        submitSuccessCount = 0

        values.set(initialValues)
        errors.set(initialErrors)
        touched.set(initialTouched)

        onReset($values, getBag())
    }

    function handleSubmit() {
        touched.set(mapValues($validators, () => true))

        submitAttemptCount += 1
        isSubmitting = true
        isValidating = true

        const nextErrors = handleValidate()

        isValidating = false

        // isValid hasn't updated yet
        if (!isEmpty(pickBy(nextErrors))) {
            submitFailureCount += 1
            isSubmitting = false
            return
        }

        const result = onSubmit($values, getBag())

        if (result && typeof result.then === 'function') {
            return Promise.resolve(result)
                .then(submitSuccess)
                .catch(errors => submitFailure(errors))
        }
    }

    function handleValidate(nextValues = $values, onlyField) {
        if (onlyField) {
            if ($validators[onlyField]) {
                errors.update(_e => ({
                    ..._e,
                    [onlyField]: $validators[onlyField](
                        nextValues[onlyField],
                        getBag(),
                    ),
                }))
            }

            return
        }

        const nextErrors = merge(
            validate(nextValues, getBag()),
            mapValues($validators, (_, name) => {
                if (!$validators[name]) return

                return $validators[name](nextValues[name], getBag())
            }),
        )

        errors.set(nextErrors)

        return nextErrors
    }

    setContext('handleBlur', handleBlur)
    setContext('handleInput', handleInput)
    setContext('handleReset', handleReset)
    setContext('handleSubmit', handleSubmit)
    setContext('sveltikBag', bag)

    onMount(() => {
        if (validateOnMount) {
            handleValidate()
        }
    })
</script>

<!-- prettier-ignore -->
<slot
    errors={$errors}
    touched={$touched}
    values={$values}
    warnings={$warnings}
    {isDirty}
    {isSubmitting}
    {isValid}
    {isValidating}
    {status}
    {submitAttemptCount}
    {submitFailureCount}
    {submitSuccessCount}
    {resetForm}
    {setErrors}
    {setFieldError}
    {setFieldTouched}
    {setFieldValue}
    {setFieldWarning}
    {setStatus}
    {setSubmitting}
    {setTouched}
    {setValues}
    {setWarnings}
    {submitFailure}
    {submitForm}
    {submitSuccess}
    {validateField}
    {validateForm}
    {handleBlur}
    {handleInput}
    {handleReset}
    {handleSubmit}
    props={{ errors: $errors, touched: $touched, values: $values, warnings: $warnings, isDirty, isSubmitting, isValid, isValidating, status, submitAttemptCount, submitFailureCount, submitSuccessCount, resetForm, setErrors, setFieldError, setFieldTouched, setFieldValue, setFieldWarning, setStatus, setSubmitting, setTouched, setValues, setWarnings, submitFailure, submitForm, submitSuccess, validateField, validateForm, handleBlur, handleInput, handleReset, handleSubmit }}
/>
