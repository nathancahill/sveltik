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
