<script>
    import { Sveltik, Field } from '../../src'
</script>

<Sveltik>
    <Field as="select" name="color" multiple>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
    </Field>
</Sveltik>
