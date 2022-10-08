<template>
  <div>
    <button @click="openDialog">Open Dialog</button>
  </div>
  <div id="app-dialog-root" class="dialog-root" v-if="dialogs.reduce((acc, val) => {return val.isOpen})">
    <div class="wrapper" v-for="(dialogElement, index) in dialogs" :key="index" :title="dialogElement.title">
      <Component :is="dialogElement.getComponent()" v-if="dialogElement.isOpen" @confirm="dialogElement.confirm()"
                 @cancel="dialogElement.cancel()"
                 :title="dialogElement.getTitle()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ConfirmDialog} from "./dialog/ConfirmDialog";
import {Dialog} from "./dialog/Dialog";
import {reactive} from "vue";


const dialogs: Array<Dialog> = reactive([])

class ConfirmUserDeleteDialog extends ConfirmDialog {
  constructor() {
    super()
    dialogs.push(this)
  }

  protected title = "Подтвердите удаление пользователя";

  getComponent(): string {
    return this.component
  }

  getTitle(): string {
    return this.title ?? 'Подтвердите действие'
  }
}

dialogs.push(new ConfirmUserDeleteDialog())



const openDialog = async () => {
  const dialog = new ConfirmUserDeleteDialog();
  const result = await dialog.open();
  console.log(result);
};


</script>
