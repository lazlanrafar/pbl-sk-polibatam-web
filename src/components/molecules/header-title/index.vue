<template>
  <div>
    <h3 class="h4">{{ title }}</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb pl-0">
        <li class="breadcrumb-item">IT Inventory</li>
        <li class="breadcrumb-item active">{{ subtitle }}</li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header Title",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
};
</script>
