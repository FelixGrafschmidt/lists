<template>
  <div class="relative grid m-auto rounded-2xl bg-gray-800 pb-10 text-gray-100" @click.stop>
    <div class="self-center pt-8 text-center text-3xl">
      Contact us
    </div>
    <div class="mt-12 px-16">
      Feel free to
      <a class="text-blue-500 hover:text-blue-300" target="_blank" href="https://github.com/Ithambar/character_viewer/issues/new">raise an issue</a>
      on our Github page or
      <a class="text-blue-500 hover:text-blue-300" target="_blank" href="https://github.com/Ithambar/character_viewer/issues">add more info</a>
      to an existing issue.
      <br>You can also
      <a
        class="text-blue-500 hover:text-blue-300"
        target="_blank"
        href="mailto:felix.grafschmidt@gmail.com?subject=Issue%20on%20character%20manager%20webpage"
      >send us an e-mail</a>.
    </div>
    <MoeModalCloseButton />
  </div>
</template>

<script setup lang="ts">
</script>
