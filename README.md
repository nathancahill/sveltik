# Sveltik

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
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
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
        <ErrorMessage name="email" component="div" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="div" />
        <button type="submit" disabled={isSubmitting}>
            Submit
        </button>
    </Form>
</Sveltik>
```

## `<Sveltik />`

`<Sveltik />` is a component for rendering forms. It is largely a port of
[Formik](https://jaredpalmer.com/formik/docs/api/formik) to Svelte and broadly
follows the same API. It uses a `let:props` pattern which is generally similar to
the render prop pattern in React.

### Example

[Open in REPL](https://svelte.dev/repl/5ba56f98dc7f4911818ec5617c6b3024?version=3.19.0)

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
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);
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
- `validate?: (values: Values) => SveltikErrors<Values>`
- `validateOnBlur?: boolean`
- `validateOnChange?: boolean`
- `validateOnMount?: boolean`

### Reference

#### Props

##### let:props

All of these props are exposed individually as well as a master `let:props` prop which is an object
of all available props.

###### `let:dirty: boolean`

Returns `true` if values are not deeply equal from initial values, `false` otherwise. `dirty` is a readonly computed property and should not be mutated directly.

###### `let:errors: { [field: string]: string }`

Form validation errors. Should match the shape of your form's values defined in `initialValues`.

###### `let:handleBlur: (e: HTMLBlurEvent) => void`

`onBlur` event handler. Useful for when you need to track whether an input has been `touched` or not. This should be passed to
`<input on:blur={handleBlur} ... />`

###### `let:handleChange: (e: HTMLInputEvent) => void`

General input change event handler. This will update the `values[key]` where `key` is the event-emitting input's `name` attribute. If the `name` attribute is not present, `handleChange` will look for an input's `id` attribute. Note: "input" here means all HTML inputs.

###### `let:handleReset: () => void`

Reset handler. Will reset the form to its initial state. This should be passed to `<button on:click={handleReset}>...</button>`

###### `let:handleSubmit: (e: HTMLFormEvent) => void`

Submit handler. This should be passed to `<form on:submit|preventDefault={props.handleSubmit}>...</form>`.

###### `let:isSubmitting: boolean`

Submitting state of the form. Returns `true` if submission is in progress and `false` otherwise.

###### `let:isValid: boolean`

Returns `true` if there are no `errors` (i.e. the `errors` object is empty) and `false` otherwise.

###### `let:isValidating: boolean`

Returns `true` if Sveltik is running validation during submission, or by calling `validateForm` directly false otherwise.

###### `let:resetForm: (nextInitialState?: SveltikState<Values>) => void`

Imperatively reset the form. If `nextInitialState` is specified, Sveltik will set this state as the new "initial state" and use the related values of `nextInitialState` to update the form's `initialValues` as well as `initialTouched`, `initialStatus`, `initialErrors`. This is useful for altering the initial state (i.e. "base") of the form after changes have been made. If `nextInitialState` is not defined, then Sveltik will reset state to the original initial state.

###### `let:setErrors: (fields: { [field: string]: string }) => void`

Set `errors` imperatively.

###### `let:setFieldError: (field: string, errorMsg: string) => void`

Set the error message of a field imperatively. `field` should match the key of `errors` you wish to update. Useful for creating custom input error handlers.

###### `let:setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void`

Set the touched state of a field imperatively. `field` should match the key of `touched` you wish to update. Useful for creating custom input blur handlers. Calling this method will trigger validation to run if `validateOnBlur` is set to `true` (which it is by default). `isTouched` defaults to `true` if not specified. You can also explicitly prevent/skip validation by passing a third argument as `false`.

###### `let:setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void`

Set the value of a `field` imperatively. `field` should match the key of `values` you wish to update. Useful for creating custom input change handlers. Calling this will trigger validation to run if `validateOnChange` is set to `true` (which it is by default). You can also explicitly prevent/skip validation by passing a third argument as `false`.

###### `let:setFieldWarning: (field: string, warning: string) => void`

Set the warning of a `field` imperatively. `field` should match the key of `warnings` you wish to update.

###### `let:setStatus: (status?: any) => void`

Set a top-level `status` to anything you want imperatively. Useful for controlling arbitrary top-level state related to your form. For example, you can use it to pass API responses back into your component in `handleSubmit`.

###### `let:setSubmitting: (isSubmitting: boolean) => void`

Set `isSubmitting` imperatively. You would call it with `setSubmitting(false)` in your `onSubmit` handler to finish the cycle.

###### `let:setTouched: (fields: { [field: string]: boolean }, shouldValidate?: boolean) => void`

Set `touched` imperatively. Calling this will trigger validation to run if `validateOnBlur` is set to `true` (which it is by default). You can also explicitly prevent/skip validation by passing a second argument as `false`.

###### `let:setValues: (fields: { [field: string]: any }, shouldValidate?: boolean) => void`

Set `values` imperatively. Calling this will trigger validation to run if `validateOnChange` is set to `true` (which it is by default). You can also explicitly prevent/skip validation by passing a second argument as `false`.

###### `let:setWarnings: (fields: { [field: string]: string }) => void`

Set `warnings` imperatively.

###### `let:status?: any`

A top-level status object that you can use to represent form state that can't otherwise be expressed/stored with other methods. This is useful for capturing and passing through API responses to your inner component. `status` should only be modified by calling `setStatus`.

###### `let:submitAttemptCount: number`

Number of times user tried to submit the form. Increases when `handleSubmit` is called, resets after calling `handleReset`.

###### `let:submitFailure: () => void`

Increment `submitFailureCount` by 1 and calls `setSubmitting(false)`.

###### `let:submitFailureCount: number`

Number of failed form submissions. Increases when `submitFailure` is called, resets after calling `handleReset`.

###### `let:submitForm: () => Promise`

Trigger a form submission. The promise will be rejected if form is invalid.

###### `let:submitSuccess: () => void`

Increment `submitSuccessCount` by 1 and calls `setSubmitting(false)`.

###### `let:submitSuccessCount: number`

Number of successful form submissions. Increases when `submitSuccess` is called, resets after calling `handleReset`.

###### `let:touched: { [field: string]: boolean }`

Touched fields. Each key corresponds to a field that has been touched/visited.

###### `let:values: { [field: string]: any }`

Your form's values.

###### `let:validateForm: (values?: any) => void`

Imperatively call `validate`. You can optionally pass values to validate against and this modify Sveltik state accordingly, otherwise this will use the current `values` of the form.

###### `let:validateField: (field: string) => void`

Imperatively call field's `validate` function if specified for given field. Sveltik will use the current field value.

###### `let:warnings: { [field: string]: string }`

Form warnings. Should match the shape of your form's values defined in `initialValues`.

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

#### Differences with `<Formik />`

- Includes `warnings`, `setWarnings`, `setFieldWarning`
- Validation is synchronous
- Includes `submitSuccess` and `submitFailure` helpers
- Tracks `submitAttemptCount`, `submitFailureCount` and `submitSuccessCount` instead of `submitCount`
- If `onSubmit` returns a promise, rejection calls `submitFailure` and resolution calls `submitSuccess`
- Does not (yet) implement Yup or `validateSchema`

## `<Field />`

`<Field />` will automagically hook up inputs to Sveltik. It uses the name attribute to match up with Sveltik state. `<Field />` will default to an HTML `<input />` element.

### Example

```html
<script>
import { Sveltik, Form, Field } from 'sveltik'
</script>

<div>
    <h1>My Form</h1>
    <Sveltik
        initialValues={{ email: '', color: 'red', firstName: '' }}
        onSubmit={(values, actions) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
            }, 1000);
        }}
    >
        <Form>
            <Field type="email" name="email" placeholder="Email" />
            <Field as="select" name="color">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
            </Field>

            <Field name="lastName" let:field let:meta>
                <div>
                    <input type="text" placeholder="Email" {...field} />
                    {#if meta.touched && meta.error}
                        <div className="error">{meta.error}</div>
                    {/if}
                </div>
            </Field>
            <button type="submit">Submit</button>
        </Form>
    </Sveltik>
</div>
```