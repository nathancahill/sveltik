# Sveltik ![CI](https://github.com/nathancahill/sveltik/workflows/CI/badge.svg)

Forms in Svelte, inspired by [Formik](https://jaredpalmer.com/formik/).

```html
<script>
    import { Sveltik, Form, Field, ErrorMessage } from 'sveltik'

    let initialValues = {
        email: '',
        password: '',
    }

    let validate = values => {
        const errors = {}
        if (!values.email) {
            errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
        return errors
    }

    let onSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
        }, 400)
    }
</script>

<Sveltik {initialValues} {validate} {onSubmit} let:isSubmitting>
    <Form>
        <Field type="email" name="email" />
        <ErrorMessage name="email" as="div" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" as="div" />
        <button type="submit" disabled={isSubmitting}>Submit</button>
    </Form>
</Sveltik>
```

## `<Sveltik />`

`<Sveltik />` is a component for rendering forms. It is largely a port of
[Formik](https://jaredpalmer.com/formik/docs/api/formik) to Svelte and broadly
follows the same API. It uses a `let:props` pattern which is generally similar to
the render prop pattern in React.

### Example

[Open in REPL](https://svelte.dev/repl/5ba56f98dc7f4911818ec5617c6b3024?version=3)

```html
<script>
    import { Sveltik } from 'sveltik'
</script>

<div>
    <h1>My Form</h1>
    <Sveltik
        initialValues={{ name: 'jared' }}
        onSubmit={(values, actions) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                actions.setSubmitting(false)
            }, 1000)
        }}
        let:props
    >
        <form on:submit|preventDefault={props.handleSubmit}>
            <input
                type="text"
                on:change={props.handleChange}
                on:blur={props.handleBlur}
                value={props.values.name}
                name="name"
            />
            {#if props.errors.name}
                <div id="feedback">{props.errors.name}</div>
            {/if}
            <button type="submit">Submit</button>
        </form>
    </Sveltik>
</div>
```

### Props

- `enableReinitialize?: boolean`
- `initialErrors?: SveltikErrors<Values>`
- `initialStatus?: any`
- `initialTouched?: SveltikTouched<Values>`
- `initialValues: Values`
- `initialWarnings?: SveltikWarnings<Values>`
- `onReset?: (values: Values, sveltikBag: SveltikBag) => void`
- `onSubmit: (values: Values, sveltikBag: SveltikBag) => void | Promise<any>`
- `validate?: (values: Values, sveltikBag: SveltikBag) => SveltikErrors<Values>`
- `validateOnBlur?: boolean`
- `validateOnChange?: boolean`
- `validateOnMount?: boolean`

### let:props

- `let:props: SveltikProps`
- `let:isDirty: boolean`
- `let:errors: { [field: string]: string }`
- `let:handleBlur: (e: HTMLBlurEvent) => void`
- `let:handleChange: (e: HTMLInputEvent) => void`
- `let:handleReset: () => void`
- `let:handleSubmit: (e: HTMLFormEvent) => void`
- `let:isSubmitting: boolean`
- `let:isValid: boolean`
- `let:isValidating: boolean`
- `let:resetForm: (nextInitialState?: SveltikState<Values>) => void`
- `let:scrollFirstErrorIntoView: () => void`
- `let:setErrors: (fields: { [field: string]: string }) => void`
- `let:setFieldError: (field: string, errorMsg: string) => void`
- `let:setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void`
- `let:setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void`
- `let:setFieldWarning: (field: string, warning: string) => void`
- `let:setStatus: (status?: any) => void`
- `let:setSubmitting: (isSubmitting: boolean) => void`
- `let:setTouched: (fields: { [field: string]: boolean }, shouldValidate?: boolean) => void`
- `let:setValues: (fields: { [field: string]: any }, shouldValidate?: boolean) => void`
- `let:setWarnings: (fields: { [field: string]: string }) => void`
- `let:status: any`
- `let:submitAttemptCount: number`
- `let:submitFailure: () => void`
- `let:submitFailureCount: number`
- `let:submitForm: () => Promise`
- `let:submitSuccess: () => void`
- `let:submitSuccessCount: number`
- `let:touched: { [field: string]: boolean }`
- `let:values: { [field: string]: any }`
- `let:validateForm: (values?: any) => void`
- `let:validateField: (field: string) => void`
- `let:warnings: { [field: string]: string }`

### Reference

#### Props

##### `enableReinitialize?: boolean`

Default is false. Control whether Sveltik should reset the form if `initialValues` changes (using deep equality).

##### `initialErrors?: SveltikErrors<Values>`

Initial field errors of the form, Sveltik will make these values available to render methods component as `errors`.

##### `initialStatus?: any`

An arbitrary value for the initial `status` of the form. If the form is reset, this value will be restored.

##### `initialTouched?: SveltikTouched<Values>`

Initial visitied fields of the form, Sveltik will make these values available to render methods component as `touched`.

##### `initialValues: Values`

Initial field values of the form, Sveltik will make these values available to render methods component as `values`.

Even if your form is empty by default, you must initialize all fields with initial values.

##### `onReset?: (values: Values, sveltikBag: SveltikBag) => void`

Your optional form reset handler. It is passed your forms `values` and the "SveltikBag".

##### `onSubmit: (values: Values, sveltikBag: SveltikBag) => void | Promise<any>`

Your form submission handler. It is passed your forms `values` and the "SveltikBag", which includes an object containing a subset of the injected props and methods (i.e. all the methods with names that start with `set<Thing>` + `resetForm`) and any props that were passed to the wrapped component.
If `onSubmit` returns a promise, rejection automatically calls `submitFailure` and resolution automatically calls `submitSuccess`.

##### `validate?: (values: Values) => SveltikErrors<Values>`

Validate the form's `values` with function. Synchronous and return an `errors` object.

##### `validateOnBlur?: boolean`

Default is `true`. Use this option to run validations on `blur` events. More specifically, when either `handleBlur`, `setFieldTouched`, or `setTouched` are called.

##### `validateOnChange?: boolean`

Default is `true`. Use this option to tell Sveltik to run validations on `change` events and `change`-related methods. More specifically, when either `handleChange`, `setFieldValue`, or `setValues` are called.

##### `validateOnMount?: boolean`

Default is `false`. Use this option to tell Sveltik to run validations when the `<Sveltik />` component mounts and/or `initialValues` change.

#### let:props

All of these props are exposed individually as well as a master `let:props` prop which is an object
of all available props.

##### `let:isDirty: boolean`

Returns `true` if values are not deeply equal from initial values, `false` otherwise. `dirty` is a readonly computed property and should not be mutated directly.

##### `let:errors: { [field: string]: string }`

Form validation errors. Should match the shape of your form's values defined in `initialValues`.

##### `let:handleBlur: (e: HTMLBlurEvent) => void`

`onBlur` event handler. Useful for when you need to track whether an input has been `touched` or not. This should be passed to
`<input on:blur={handleBlur} ... />`

##### `let:handleChange: (e: HTMLInputEvent) => void`

General input change event handler. This will update the `values[key]` where `key` is the event-emitting input's `name` attribute. If the `name` attribute is not present, `handleChange` will look for an input's `id` attribute. Note: "input" here means all HTML inputs.

##### `let:handleReset: () => void`

Reset handler. Will reset the form to its initial state. This should be passed to `<button on:click={handleReset}>...</button>`

##### `let:handleSubmit: (e: HTMLFormEvent) => void`

Submit handler. This should be passed to `<form on:submit|preventDefault={props.handleSubmit}>...</form>`.

##### `let:isSubmitting: boolean`

Submitting state of the form. Returns `true` if submission is in progress and `false` otherwise.

##### `let:isValid: boolean`

Returns `true` if there are no `errors` (i.e. the `errors` object is empty) and `false` otherwise.

##### `let:isValidating: boolean`

Returns `true` if Sveltik is running validation during submission, or by calling `validateForm` directly false otherwise.

##### `let:resetForm: (nextInitialState?: SveltikState<Values>) => void`

Imperatively reset the form. If `nextInitialState` is specified, Sveltik will set this state as the new "initial state" and use the related values of `nextInitialState` to update the form's `initialValues` as well as `initialTouched`, `initialStatus`, `initialErrors`. This is useful for altering the initial state (i.e. "base") of the form after changes have been made. If `nextInitialState` is not defined, then Sveltik will reset state to the original initial state.

##### `let:scrollFirstErrorIntoView: () => void`

Scroll the first `<ScrollMarker />` with an error into view. First is calculated by the vertical distance from the top of the document.

##### `let:setErrors: (fields: { [field: string]: string }) => void`

Set `errors` imperatively.

##### `let:setFieldError: (field: string, errorMsg: string) => void`

Set the error message of a field imperatively. `field` should match the key of `errors` you wish to update. Useful for creating custom input error handlers.

##### `let:setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void`

Set the touched state of a field imperatively. `field` should match the key of `touched` you wish to update. Useful for creating custom input blur handlers. Calling this method will trigger validation to run if `validateOnBlur` is set to `true` (which it is by default). `isTouched` defaults to `true` if not specified. You can also explicitly prevent/skip validation by passing a third argument as `false`.

##### `let:setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void`

Set the value of a `field` imperatively. `field` should match the key of `values` you wish to update. Useful for creating custom input change handlers. Calling this will trigger validation to run if `validateOnChange` is set to `true` (which it is by default). You can also explicitly prevent/skip validation by passing a third argument as `false`.

##### `let:setFieldWarning: (field: string, warning: string) => void`

Set the warning of a `field` imperatively. `field` should match the key of `warnings` you wish to update.

##### `let:setStatus: (status?: any) => void`

Set a top-level `status` to anything you want imperatively. Useful for controlling arbitrary top-level state related to your form. For example, you can use it to pass API responses back into your component in `handleSubmit`.

##### `let:setSubmitting: (isSubmitting: boolean) => void`

Set `isSubmitting` imperatively. You would call it with `setSubmitting(false)` in your `onSubmit` handler to finish the cycle.

##### `let:setTouched: (fields: { [field: string]: boolean }, shouldValidate?: boolean) => void`

Set `touched` imperatively. Calling this will trigger validation to run if `validateOnBlur` is set to `true` (which it is by default). You can also explicitly prevent/skip validation by passing a second argument as `false`.

##### `let:setValues: (fields: { [field: string]: any }, shouldValidate?: boolean) => void`

Set `values` imperatively. Calling this will trigger validation to run if `validateOnChange` is set to `true` (which it is by default). You can also explicitly prevent/skip validation by passing a second argument as `false`.

##### `let:setWarnings: (fields: { [field: string]: string }) => void`

Set `warnings` imperatively.

##### `let:status: any`

A top-level status object that you can use to represent form state that can't otherwise be expressed/stored with other methods. This is useful for capturing and passing through API responses to your inner component. `status` should only be modified by calling `setStatus`.

##### `let:submitAttemptCount: number`

Number of times user tried to submit the form. Increases when `handleSubmit` is called, resets after calling `handleReset`.

##### `let:submitFailure: () => void`

Increment `submitFailureCount` by 1 and calls `setSubmitting(false)`.

##### `let:submitFailureCount: number`

Number of failed form submissions. Increases when `submitFailure` is called, resets after calling `handleReset`.

##### `let:submitForm: () => Promise`

Trigger a form submission. The promise will be rejected if form is invalid.

##### `let:submitSuccess: () => void`

Increment `submitSuccessCount` by 1 and calls `setSubmitting(false)`.

##### `let:submitSuccessCount: number`

Number of successful form submissions. Increases when `submitSuccess` is called, resets after calling `handleReset`.

##### `let:touched: { [field: string]: boolean }`

Touched fields. Each key corresponds to a field that has been touched/visited.

##### `let:values: { [field: string]: any }`

Your form's values.

##### `let:validateForm: (values?: any) => void`

Imperatively call `validate`. You can optionally pass values to validate against and this modify Sveltik state accordingly, otherwise this will use the current `values` of the form.

##### `let:validateField: (field: string) => void`

Imperatively call field's `validate` function if specified for given field. Sveltik will use the current field value.

##### `let:warnings: { [field: string]: string }`

Form warnings. Should match the shape of your form's values defined in `initialValues`.

#### Differences with Formik

- Validation is synchronous
- Includes support for field warnings with `warnings`, `setWarnings`, `setFieldWarning`
- Includes support for submission success/failure with `submitSuccess` and `submitFailure` helpers
- Tracks `submitAttemptCount`, `submitFailureCount` and `submitSuccessCount` instead of only `submitCount`
- If `onSubmit` returns a promise, it's rejection calls `submitFailure` and it's resolution calls `submitSuccess`
- Does not (yet) implement Yup or `validateSchema`

## `<Field />`

`<Field />` will automagically hook up inputs to Sveltik. It uses the name attribute to match up with Sveltik state.
With no options passed, `<Field />` will default to an HTML `<input />` element.

### Example

[Open in REPL](https://svelte.dev/repl/47dade3d6be14be685c0347e0d525de7?version=3)

**MyInput.svelte**

```html
<script>
    export let field
    export let props
</script>

<input {...field} {...props} on:input={field.handleInput} on:blur={field.handleBlur} />
```

**App.svelte**

```html
<script>
    import { Sveltik, Form, Field } from 'sveltik'
    import MyInput from './MyInput.svelte'
</script>

<div>
    <h1>My Form</h1>
    <Sveltik
        initialValues={{ email: '', color: 'red', firstName: '', lastName: '' }}
        onSubmit={(values, actions) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                actions.setSubmitting(false)
            }, 1000)
        }}
    >
        <Form>
            <Field type="email" name="email" placeholder="Email" />
            <Field as="select" name="color">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
            </Field>

            <Field name="firstName" let:field let:meta>
                <div>
                    <input
                        type="text"
                        placeholder="Jon"
                        {...field}
                        on:input={field.handleInput}
                        on:blur={field.handleBlur}
                    />
                    {#if meta.touched && meta.error}
                        <div className="error">{meta.error}</div>
                    {/if}
                </div>
            </Field>

            <Field name="lastName" placeholder="Doe" as={MyInput} />
            <button type="submit">Submit</button>
        </Form>
    </Sveltik>
</div>
```

### Props

- `as?: string | Component`
- `name: string`
- `validate?: (value: any) => undefined | string`

### let:props

- `let:field: FieldInputProps`
- `let:form: SveltikBag`
- `let:meta: FieldMetaProps`

### Reference

#### Props

##### `as?: string | Component`

Either a Svelte component or the name of an HTML element to render. Supports the following:

- `input`
- `select`
- `textarea`

Svelte components must `export let` the props that they expect to be passed.
The available props are match the let:props (see below). Also is passed an additional prop
`props` which contains all additional props passed to `<Field />`.

##### `name: string`

A field's name in Sveltik state. Required.

##### `validate?: (value: any) => undefined | string`

You can run independent field-level validations by passing a function to the `validate` prop.
The function will respect the `validateOnBlur` and `validateOnChange` config/props specified in the `<Field>`'s parent `<Sveltik>`.

If invalid, return a `string` containing the error message or return `undefined`.

#### let:props

##### `let:field: FieldInputProps`

An object that contains:

- `name: string` - The name of the field
- `value: any` - The value of the field
- `handleInput: (e: HTMLInputEvent) => void` - Input handler to be bound with `on:input`
- `handleBlur: (e: HTMLBlurEvent) => void` - Blur handler to be bound with `on:blur`

##### `let:form: SveltikBag`

##### `let:meta: FieldMetaProps`

An object that contains:

- `initialError?: string` - The field's initial error if the field is present in `initialErrors`
- `initialTouched?: boolean` - The field's initial value if the field is present in `initialTouched`
- `initialValue?: any` - The field's initial value if the field is given a value in `initialValues`
- `initialWarning?: string` - The field's initial warning if the field is given a value in `initialWarnings`
- `error?: string` - The field's error message
- `touched?: boolean` - Whether the field has been visited
- `value?: any` - The field's value
- `warning?: string` - The field's warning message

#### Differences with Formik

- Validation is synchronous
- Event handlers must be set implictly with `on:input`, `on:blur` instead of spread attributes.
- Nested field names (paths) are not supported.

## `<Form />`

Form is a small wrapper around an HTML `<form>` element that automatically hooks into Sveltik's `handleSubmit` and `handleReset`.
All other props are passed directly through to the DOM node.

```js
// so...
<Form />

// is identical to this...
<form on:reset={props.handleReset} on:submit={props.handleSubmit} {...props} />
```

## `<ErrorMessage />`

`<ErrorMessage />` is a component that renders the error message of a given field
if that field has been visited (i.e.`touched[name] === true`) (and there is an `error` message present).
It expects that all error messages are stored for a given field as a string.

### Props

- `as?: string | Component`
- `name: string`

### let:props

- `let:msg: string`

### Reference

#### Props

##### `as?: string | Component`

Either a Svelte component or the name of an HTML element to render.
If not specified, `<ErrorMessage />` will just return a string.

Svelte components must `export let` the props that they expect to be passed.
The available props are match the let:props (see below).
Also is passed an additional prop `props` which contains all additional props passed to `<ErrorMessage />`.

##### `name: string`

A field's name in Sveltik state. Required.

#### let:props

##### `let:msg: string`

A field's error message.

#### Differences with Formik

- Nested field names (paths) are not supported.
- Uses `as` prop instead of `component` for consistency with `<Field />`

## `<ScrollMarker />`

`<ScrollMarker />` marks the DOM scroll position of a form element in the document.
It renders a zero-height div. Useful for scrolling to the first field with an error.

### Props

- `name: string`

### Reference

#### Props

##### `name: string`

A field's name in Sveltik state. Required.
