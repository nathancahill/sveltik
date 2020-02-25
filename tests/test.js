import '@testing-library/jest-dom'
import { tick } from 'svelte'
import { get } from 'svelte/store'
import { mount } from 'dainte'

const clean = str => str.replace(/\>\s+?\</g, '><')

test('hello world', async () => {
    const { document } = await mount('./tests/fixtures/hello-world.svelte')
    const dom = document.body.lastChild

    expect(clean(dom.outerHTML)).toMatchInlineSnapshot(
        `"<div>Hello world</div>"`,
    )
})

test('valid input', async () => {
    const { window, document } = await mount('./tests/fixtures/input.svelte')
    const dom = document.body.lastChild

    expect(clean(dom.outerHTML)).toMatchInlineSnapshot(
        `"<form><input name=\\"email\\" type=\\"email\\"><input name=\\"password\\" type=\\"password\\"><button type=\\"submit\\">Submit</button></form>"`,
    )

    const event = new window.InputEvent('input')
    dom.elements.email.value = 'test@example.com'
    dom.elements.email.dispatchEvent(event)

    await tick()

    expect(clean(dom.outerHTML)).toMatchInlineSnapshot(
        `"<form><input name=\\"email\\" type=\\"email\\"><input name=\\"password\\" type=\\"password\\"><button type=\\"submit\\">Submit</button></form>"`,
    )
})

test('invalid input', async () => {
    const { window, document } = await mount('./tests/fixtures/input.svelte')
    const dom = document.body.lastChild

    expect(clean(dom.outerHTML)).toMatchInlineSnapshot(
        `"<form><input name=\\"email\\" type=\\"email\\"><input name=\\"password\\" type=\\"password\\"><button type=\\"submit\\">Submit</button></form>"`,
    )

    const inputEvent = new window.InputEvent('input')
    dom.elements.email.value = 'a'
    dom.elements.email.dispatchEvent(inputEvent)

    const blurEvent = new window.FocusEvent('blur')
    dom.elements.email.dispatchEvent(blurEvent)

    await tick()

    expect(clean(dom.outerHTML)).toMatchInlineSnapshot(
        `"<form><input name=\\"email\\" type=\\"email\\"><div>Invalid email address</div><input name=\\"password\\" type=\\"password\\"><button type=\\"submit\\">Submit</button></form>"`,
    )
})

test('initial state', async () => {
    const { instance } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
                password: '',
            },
        },
        inspect: true,
    })

    const state = instance.inspect()
    expect(state).toMatchObject({
        isDirty: false,
        isSubmitting: false,
        isValid: true,
        isValidating: false,
        submitAttemptCount: 0,
        submitFailureCount: 0,
        submitSuccessCount: 0,
    })
})

test('handles resetForm', async () => {
    const { instance } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
                password: '',
            },
        },
        inspect: true,
    })

    const { setValues, resetForm, values } = instance.inspect()

    setValues({ email: 'hello' })
    expect(get(values)).toMatchObject({ email: 'hello' })
    resetForm()
    expect(get(values)).toMatchObject({ email: '' })
    resetForm({ values: { email: 'hi' }, status: 'reset' })
    expect(get(values)).toMatchObject({ email: 'hi' })

    const { status } = instance.inspect()
    expect(status).toBe('reset')
})

test('handles setErrors', async () => {
    const { instance } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
                password: '',
            },
        },
        inspect: true,
    })

    const { setErrors, errors } = instance.inspect()

    setErrors({ email: 'Required' })
    expect(get(errors)).toMatchObject({ email: 'Required' })
})

test('handles setFieldError', async () => {
    const { instance } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
                password: '',
            },
        },
        inspect: true,
    })

    const { resetForm, setFieldError, errors } = instance.inspect()
    resetForm({
        errors: {
            password: 'Required',
        },
    })

    setFieldError('email', 'Required')
    expect(get(errors)).toMatchObject({
        email: 'Required',
        password: 'Required',
    })
})

test('handles setFieldTouched', async () => {
    const { instance } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
                password: '',
            },
        },
        inspect: true,
    })

    const { resetForm, setFieldTouched, touched } = instance.inspect()
    resetForm({
        touched: {
            password: true,
        },
    })

    setFieldTouched('email', true)
    expect(get(touched)).toMatchObject({
        email: true,
        password: true,
    })
})

test('handles setFieldTouched validate', async () => {
    const { instance } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
                password: '',
            },
            validate: values => {
                const errors = {}
                if (!values.email) {
                    errors.email = 'Required'
                }
                return errors
            },
            validateOnBlur: false,
        },
        inspect: true,
    })

    const { setFieldTouched, errors } = instance.inspect()

    setFieldTouched('email', true, true)
    expect(get(errors)).toMatchObject({
        email: 'Required',
    })
})

test('handles setFieldValue', async () => {
    const { instance } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
                password: '',
            },
        },
        inspect: true,
    })

    const { resetForm, setFieldValue, values } = instance.inspect()
    resetForm({
        values: {
            password: 'hello',
        },
    })

    setFieldValue('email', 'world')
    expect(get(values)).toMatchObject({
        email: 'world',
        password: 'hello',
    })
})

test('handles setFieldValue validate', async () => {
    const { instance } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
                password: '',
            },
            validate: values => {
                const errors = {}
                if (!values.email) {
                    errors.email = 'Required'
                }
                return errors
            },
            validateOnChange: false,
        },
        inspect: true,
    })

    const { setFieldValue, errors } = instance.inspect()
    setFieldValue('email', '', true)
    expect(get(errors)).toMatchObject({
        email: 'Required',
    })
})

test('updates on event', async () => {
    const { instance } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
                password: '',
            },
        },
        inspect: true,
    })

    const { handleInput, values } = instance.inspect()

    const event = { target: { name: 'email', value: 'hello' } }
    handleInput(event)

    expect(get(values)).toMatchObject({ email: 'hello', password: '' })
})

test('validates on mount', async () => {
    const { instance } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
                password: '',
            },
            validate: values => {
                const errors = {}
                if (!values.email) {
                    errors.email = 'Required'
                }
                return errors
            },
            validateOnMount: true,
        },
        inspect: true,
    })

    const { errors } = instance.inspect()

    expect(get(errors)).toMatchObject({ email: 'Required' })
})

test('touches fields on submit', async () => {
    const { instance } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
                password: '',
            },
            validate: values => {
                const errors = {}
                if (!values.email) {
                    errors.email = 'Required'
                }
                return errors
            },
            validateOnMount: true,
        },
        inspect: true,
    })

    const { errors } = instance.inspect()

    expect(get(errors)).toMatchObject({ email: 'Required' })
})
