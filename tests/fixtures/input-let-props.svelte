<script>
    import { Sveltik, Field } from '../../src'
</script>

<Sveltik>
    <Field name="color" let:field><input type="text" {...{ name: field.name, value: field.value }} /></Field>
</Sveltik>
