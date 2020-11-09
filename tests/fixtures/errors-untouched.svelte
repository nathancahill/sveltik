<script>
    import { Sveltik, ErrorMessage } from '../../src'
    import MyError from './my-error.svelte'

    let initialErrors = {
        color: 'Required',
    }

    let initialTouched = {
        color: false,
    }
</script>

<Sveltik {initialErrors} {initialTouched}>
    <ErrorMessage name="color" as="div" />
    <ErrorMessage name="color" as="div" class="error" />
    <ErrorMessage name="color" />
    <ErrorMessage name="color" as={MyError} id="my-error" />
    <ErrorMessage name="color" let:msg><span>{msg}</span></ErrorMessage>
</Sveltik>
