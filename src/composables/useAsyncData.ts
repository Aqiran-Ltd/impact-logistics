import { ref, shallowRef } from 'vue'

export function useAsyncData<T>(loader: () => Promise<T>) {
  const data = shallowRef<T | null>(null)
  const loading = ref(true)
  const error = ref<Error | null>(null)

  loader()
    .then((result) => {
      data.value = result
    })
    .catch((err: unknown) => {
      error.value = err instanceof Error ? err : new Error('Failed to load data.')
    })
    .finally(() => {
      loading.value = false
    })

  return { data, loading, error }
}
