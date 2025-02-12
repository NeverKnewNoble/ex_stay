<template>
  <div class="m-3 flex flex-row items-center justify-center">
    <Card title="Login to your FrappeUI App!" class="w-full max-w-md mt-4">
      <form class="flex flex-col space-y-2 w-full" @submit.prevent="submit">
        <Input
          required
          name="email"
          type="text"
          placeholder="johndoe@email.com"
          label="User ID"
          class="frappe-input"
        />
        <Input
          required
          name="password"
          type="password"
          placeholder="••••••"
          label="Password"
          class="frappe-input"
        />
        <Button :loading="session.login.loading" variant="solid"
          >Login</Button
        >
      </form>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { session } from '../data/session'

function submit(e) {
  let formData = new FormData(e.target)
  session.login.submit({
    email: formData.get('email'),
    password: formData.get('password'),
  })
}
</script>


<!-- <style scoped>
  /* Reapply Frappe UI default input styles only for this component */
  @import 'frappe-ui/src/style.css';

  .frappe-ui-input {
    all: revert; /* Reverts Tailwind resets and restores default styles */
  }
</style> -->