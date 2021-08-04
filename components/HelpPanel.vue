<template>
  <div class="help-panel tw-shadow-lg tw-border tw-border-gray-400 tw-bg-gray-50 tw-mr-6 tw-rounded-lg tw-px-4 tw-py-2 tw-text-left tw-mb-4">
    <div>
      <div class="tw-text-xl tw-font-semibold tw-border-b tw-border-gray-300 tw-text-gray-700 tw-mb-3 tw-pb-2">
        Kirim Laporan Bug
      </div>
      <div>
        <div class="tw-mb-4">
          <div class="mb-3">
            <label for="helpPanelInputName" class="form-label">Email</label>
            <input id="helpPanelInputName" type="email" class="form-control" placeholder="Email">
          </div>
          <div class="mb-3">
            <label for="helpPanelInputDescription" class="form-label">Deskripsikan</label>
            <textarea id="helpPanelInputDescription" class="form-control" placeholder="Deskripsi" rows="6" />
          </div>
          <div class="tw-px-1">
            <span class="tw-text-xs tw-text-gray-400">
              *Mengirim laporan akan otomatis memotret halaman ini.
            </span>
          </div>
          <div class="tw-flex tw-flex-row tw-w-full tw-justify-end">
            <Button text="Kirim" :styles="[ 'big', 'blue' ]" @click.native="sendBugReport" />
          </div>
        </div>
      </div>
    </div>
    <div class="tw-bg-gray-600 tw-rounded-lg tw-flex tw-justify-center tw-space-x-1 tw-px-1">
      <button class="tw-text-sm tw-bg-gray-200 tw-text-gray-700 tw-border tw-border-gray-200 tw-px-2 tw-py-1 tw-my-1 tw-rounded-lg">
        Lapor Bug
      </button>
      <button class="tw-text-sm tw-text-gray-50 tw-border tw-border-gray-200 tw-px-2 tw-py-1 tw-my-1 tw-rounded-lg">
        Kirim Pesan
      </button>
      <button class="tw-text-sm tw-text-gray-50 tw-border tw-border-gray-200 tw-px-2 tw-py-1 tw-my-1 tw-rounded-lg">
        Dokumentasi
      </button>
    </div>
  </div>
</template>

<script>
import {
} from '@vue/composition-api'
import html2canvas from 'html2canvas'
import { useContext } from '@nuxtjs/composition-api'

export default {
  setup () {
    const { $swal, $overlayLoading, $sleep } = useContext()
    const sendBugReport = async () => {
      $overlayLoading.show()
      const el = document.querySelector('.screen')
      const result = await html2canvas(el)
      await $sleep(1000)
      $overlayLoading.hide()
      $swal({
        title: 'Berhasil',
        text: 'Laporan bug kamu sudah terkirim dan akan ditinjau. Terimakasih!',
        icon: 'success'
      })
      const a = document.createElement('a')
      a.href = result.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream')
      a.download = 'lspapp-screenshot-bug-report.png'
      a.click()
    }

    return {
      sendBugReport
    }
  }
}
</script>

<style lang="scss" scoped>
.help-panel {
  animation: .5s ease-out 0s 1 slideInFromRight;
  max-width: 400px;
}
@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
