<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>

<template>
  <UCard
    class="mt-8 mb-8"
    :ui="{
      body: 'p-6',
      background: 'bg-gray-50 dark:bg-gray-800/50',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-700'
    }"
  >
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <UIcon
            name="i-simple-icons-github"
            class="w-12 h-12 text-gray-900 dark:text-white"
          />
        </div>
        <div class="flex flex-col gap-1">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span>📦</span>
            <span>Get the Code</span>
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Follow along with the complete working example.
          </p>
          <ULink
            :to="url"
            target="_blank"
            class="text-sm text-primary hover:underline font-mono break-all"
          >
            {{ url.replace('https://', '') }}
          </ULink>
        </div>
      </div>
      <div class="flex-shrink-0 sm:self-center">
        <UButton
          :to="url"
          target="_blank"
          color="primary"
          size="md"
          trailing-icon="i-lucide-external-link"
          label="View Repo"
        />
      </div>
    </div>
  </UCard>
</template>
