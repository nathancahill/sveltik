import { render } from 'dainte'

const clean = str => str.replace(/\>\s+?\</g, '><').trim()

test('form', async () => {
    const { html } = await render('./tests/fixtures/form.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<form class=\\"form\\"></form>"`,
    )
})
