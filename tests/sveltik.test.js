import { get } from 'svelte/store'
import { mount } from 'dainte'

test('prevents submit on invalid', async () => {
    let hasSubmitted = false

    const { sveltik } = await mount('./src/Sveltik.svelte', {
        props: {
            initialValues: {
                email: '',
            },
            validate: values => {
                const errors = {}

                if (!values.email) {
                    errors.email = 'Required'
                }

                return errors
            },
            onSubmit: () => {
                hasSubmitted = true
                return Promise.resolve()
            },
        },
        inspect: true,
    })

    const { handleSubmit } = sveltik.inspect()

    handleSubmit()

    const state = sveltik.inspect()

    expect(state).toMatchObject({
        submitAttemptCount: 1,
        submitFailureCount: 1,
        submitSuccessCount: 0,
    })

    expect(get(state.errors)).toMatchObject({
        email: 'Required',
    })

    expect(hasSubmitted).toBe(false)
})

test('submits on valid', async () => {
    let hasSubmitted = false

    const sveltik = await new Promise(async resolve => {
        const { sveltik } = await mount('./src/Sveltik.svelte', {
            props: {
                initialValues: {
                    email: 'test@example.com',
                },
                validate: values => {
                    const errors = {}

                    if (!values.email) {
                        errors.email = 'Required'
                    }

                    return errors
                },
                onSubmit: () => {
                    hasSubmitted = true
                    return Promise.resolve()
                },
            },
            inspect: true,
        })

        const { handleSubmit } = sveltik.inspect()

        handleSubmit().then(() => resolve(sveltik))
    })

    const state = sveltik.inspect()

    expect(state).toMatchObject({
        submitAttemptCount: 1,
        submitFailureCount: 0,
        submitSuccessCount: 1,
    })

    expect(hasSubmitted).toBe(true)
})
