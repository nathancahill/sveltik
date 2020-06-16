# Usage

### Custom Input Component

[Open in REPL](https://svelte.dev/repl/38b0d1009d5b4041877b138809d421df?version=3)

**StepCounter.svelte**

```html
<script>
    export let field

    let min = 0
    let max = 10

    const handleInput = value => {
        field.handleInput({
            target: {
                name: field.name,
                value,
            },
        })
    }
    const decrement = () => {
        if (field.value > min) {
            handleInput(field.value - 1)
        }
    }
    const increment = () => {
        if (field.value < max) {
            handleInput(field.value + 1)
        }
    }
</script>

<div>
    <button on:click|preventDefault={decrement}>Decrement</button>
    <input type="number" name={field.name} step="1" value={field.value} readonly />
    <button on:click|preventDefault={increment}>Increment</button>
</div>
```

**App.svelte**

```html
<script>
    import { Field } from 'sveltik'

    import StepCounter from './StepCounter.svelte'
</script>

<Field name="steps" as={StepCounter} />
```

### Svelte-Tags-Input

A small wrapper around [agustinl/svelte-tags-input](https://github.com/agustinl/svelte-tags-input).

[Open in REPL](https://svelte.dev/repl/d7845c3d47fa4c5a903f48bb65b00c16?version=3)

**TagsInput.svelte**

```html
<script>
    import Tags from 'svelte-tags-input'

    export let field
    const { name, handleInput } = field

    function handleTags({ detail: { tags } }) {
        handleInput({ target: { name, value: tags } })
    }
</script>

<Tags on:tags={handleTags} tags={field.value} {name} />
```

**App.svelte**

```html
<script>
    import { Sveltik, Field } from 'sveltik'

    import TagsInput from './TagsInput.svelte'
</script>

<Sveltik initialValues={{ tags: ['one', 'two'] }}>
    <Field name="tags" as={TagsInput} />
</Sveltik>
```
