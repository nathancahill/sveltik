<script>
    import { Sveltik } from '../../src'

    const initialValues = {
        name: 'world',
    }
</script>

<Sveltik {initialValues} let:values>
    <div>Hello {values.name}</div>
</Sveltik>
