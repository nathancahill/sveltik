<script>
import { Sveltik } from '../../src'

export let initialValues = {
    email: '',
    password: '',
}
</script>

<Sveltik
    {initialValues}
    let:props
>
    <div id="__state">
        {JSON.stringify(props)}
    </div>
</Sveltik>
