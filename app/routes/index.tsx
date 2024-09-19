import * as fs from 'fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { Button } from '@/components/button'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn('GET', () => {
  return readCount()
})

const updateCount = createServerFn('POST', async (addBy: number) => {
  const count = await readCount()
  console.log('updat count in server')
  await fs.promises.writeFile(filePath, `${count + addBy}`)
})

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    console.log('loader!!!')
    return await getCount()
  },
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <Button
      onClick={() => {
        updateCount(1).then(() => {
          router.invalidate()
        })
      }}
    >
      Add 1 to {state}?
    </Button>
  )
}
