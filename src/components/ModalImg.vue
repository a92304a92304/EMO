<template lang="html">
  <div class="modal fade" id="modal-img" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body text-center">
          <img class="img-fluid" :src="img" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['img']
}
</script>
