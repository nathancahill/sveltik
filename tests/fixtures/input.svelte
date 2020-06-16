<script>
    import { Sveltik, Form, Field, ErrorMessage } from '../../src'

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

    let onSubmit = values =>
        new Promise((resolve, reject) => {
            resolve()
        })
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
