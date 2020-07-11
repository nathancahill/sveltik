<script>
    import { Sveltik, Field } from '../../src'
    import Input from './input-component.svelte'
</script>

<Sveltik>
    <Field as={Input} name="color" placeholder="Blue" />
</Sveltik>
