<template>
  <OverlayPage :is-loading="isLoading" title="FR-APL-01. FORMULIR PERMOHONAN SERTIFIKASI KOMPETENSI" @close="close">
    <!-- footer button -->
    <div slot="footer-button">
      <Button v-if="cachedRequestSchema && cachedRequestSchema[0] && cachedRequestSchema[0].status === 'Approved'" text="Batalkan Penyetujan" :icon="['fas', 'times']" :styles="['big', 'red']" @click.native="cancelApproved" />
      <Button v-if="cachedRequestSchema && cachedRequestSchema[0] && cachedRequestSchema[0].status === 'Rejected'" text="Batalkan Penolakan" :icon="['fas', 'times']" :styles="['big', 'red']" @click.native="cancelRejected" />
    </div>

    <!-- content -->
    <div v-if="schemaRequest && cachedRequestSchema" class="tw-mb-8">
      <!-- section:user -->
      <Tabs class="tw-mb-8">
        <Tab title="List User Yang Dipilih" class="tab__flex tw-shadow-lg">
          <Collapsible>
            <CollapsibleItem v-for="(item, i) in cachedRequestSchema" :key="i" :title="`${i+1}. ${cachedRequestSchema[i].user_name} - ${cachedRequestSchema[i].user_email}`">
              <Tabs>
                <Tab title="Bagian 1" class="tab__flex">
                  <!-- Rincian Data Pemohon Sertifikasi -->
                  <section class="tw-mb-8">
                    <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-mb-4 tw-pb-1 tw-inline-block tw-border-b-2 tw-border-gray-500">
                      Rincian Data Pemohon Sertifikasi
                    </div>
                    <div class="form">
                      <!-- name -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputUserName" class="form-label tw-self-center">Nama Lengkap</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input id="inputUserName" :value="cachedRequestSchema[i].user_name" type="text" class="form-control" placeholder="Nama Lengkap" disabled>
                        </div>
                      </div>
                      <!-- birth -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputUserPlaceOfBirth" class="form-label tw-self-center">Tempat Lahir</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6 tw-flex tw-space-x-2">
                          <input id="inputUserPlaceOfBirth" v-model="cachedRequestSchema[i].user_place_of_birth" type="text" class="form-control" placeholder="Tempat Lahir" disabled>
                          <input id="inputUserDateOfBirth" :value="$moment(cachedRequestSchema[i].user_date_of_birth).format('YYYY-MM-DD').toString()" type="date" class="form-control" placeholder="Tanggal Lahir" disabled>
                        </div>
                      </div>
                      <!-- nationality -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputUserNationality" class="form-label tw-self-center">Kebangsaan</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input id="inputUserNationality" v-model="cachedRequestSchema[i].user_nationality" type="text" class="form-control" placeholder="Kebangsaan" disabled>
                        </div>
                      </div>
                      <!-- address -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputUserAddress" class="form-label tw-self-center">Alamat Rumah</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input id="inputUserAddress" v-model="cachedRequestSchema[i].user_address" type="text" class="form-control" placeholder="Alamat Rumah" disabled>
                        </div>
                      </div>
                      <!-- email -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputUserEmail" class="form-label tw-self-center">Email</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input id="inputUserEmail" v-model="cachedRequestSchema[i].user_email" type="text" class="form-control" placeholder="Email" disabled>
                        </div>
                      </div>
                      <!-- phone -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputUserPhone" class="form-label tw-self-center">Nomor Telepon</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input id="inputUserPhone" v-model="cachedRequestSchema[i].user_phone" type="text" class="form-control" placeholder="Nomor Telepon" disabled>
                        </div>
                      </div>
                      <!-- last education -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputUserLastEducation" class="form-label tw-self-center">Pendidikan Terakhir</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input id="inputUserLastEducation" v-model="cachedRequestSchema[i].user_last_education" type="text" class="form-control" placeholder="Pendidikan Terakhir" disabled>
                        </div>
                      </div>
                    </div>
                  </section>
                </Tab>
                <Tab title="Bagian 2" class="tab__flex">
                  <!-- Data Pekerjaan Sekarang -->
                  <section class="tw-mb-4">
                    <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-mb-4 tw-pb-1 tw-inline-block tw-border-b-2 tw-border-gray-500">
                      Data Pekerjaan Sekarang
                    </div>
                    <div class="form">
                      <!-- job -->
                      <div class="mb-2 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-6 tw-justify-center">
                        <div class="form-check">
                          <input id="inputJob1" v-model="cachedRequestSchema[i].user_job" class="form-check-input" type="radio" name="inputJob" value="1" disabled>
                          <label class="form-check-label" for="inputJob1">
                            Saya Bekerja
                          </label>
                        </div>
                        <div class="form-check">
                          <input id="inputJob2" v-model="cachedRequestSchema[i].user_job" class="form-check-input" type="radio" name="inputJob" value="0" disabled>
                          <label class="form-check-label" for="inputJob2">
                            Saya Tidak Bekerja
                          </label>
                        </div>
                      </div>
                      <!-- name -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputCompanyName" class="form-label tw-self-center">Nama</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input id="inputCompanyName" v-model="cachedRequestSchema[i].user_company_name" type="text" class="form-control" placeholder="Nama Lembaga / Perusahaan" disabled>
                        </div>
                      </div>
                      <!-- position -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputCompanyPosition" class="form-label tw-self-center">Jabatan</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input id="inputCompanyPosition" v-model="cachedRequestSchema[i].user_company_position" type="text" class="form-control" placeholder="Jabatan" disabled>
                        </div>
                      </div>
                      <!-- address -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputCompanyAddress" class="form-label tw-self-center">Alamat</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input id="inputCompanyAddress" v-model="cachedRequestSchema[i].user_company_address" type="text" class="form-control" placeholder="Alamat" disabled>
                        </div>
                      </div>
                      <!-- email -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputCompanyEmail" class="form-label tw-self-center">Email</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input id="inputCompanyEmail" v-model="cachedRequestSchema[i].user_company_email" type="text" class="form-control" placeholder="Email" disabled>
                        </div>
                      </div>
                      <!-- phone -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputCompanyPhone" class="form-label tw-self-center">Nomor Telepon</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input id="inputCompanyPhone" v-model="cachedRequestSchema[i].user_company_phone" type="text" class="form-control" placeholder="Nomor Telepon" disabled>
                        </div>
                      </div>
                    </div>
                  </section>
                </Tab>
                <Tab title="Bagian 3" class="tab__flex">
                  <!-- Data Sertifikasi -->
                  <section class="tw-mb-4">
                    <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-mb-4 tw-pb-1 tw-inline-block tw-border-b-2 tw-border-gray-500">
                      Data Sertifikasi
                    </div>
                    <div class="form">
                      <!-- purpose -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label for="inputPurpose" class="form-label tw-self-center">Nama</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <select id="inputPurpose" v-model="cachedRequestSchema[i].purpose" class="form-control" placeholder="Tujuan" disabled>
                            <option value="certification">Sertifikasi</option>
                            <option value="recertification">Sertifikasi Ulang</option>
                            <option value="other">Lainnya</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </section>
                </Tab>
                <Tab title="File Persyaratan" class="tab__flex">
                  <!-- File Persyaratan -->
                  <section class="tw-mb-8">
                    <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-mb-4 tw-pb-1 tw-inline-block tw-border-b-2 tw-border-gray-500">
                      File Persyaaratan
                    </div>
                    <div class="form">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th width="5%" class="tw-text-center">#</th>
                            <th width="45%" class="tw-text-center">Nama</th>
                            <th width="25%" class="tw-text-center">Format</th>
                            <th width="15%" class="tw-text-center">...</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(file, j) in cachedRequestSchema[i].files" :key="j">
                            <td>{{ j+1 }}</td>
                            <td>{{ file.name }}</td>
                            <td>{{ file.type }}</td>
                            <td class="tw-text-center">
                              <button class="btn btn-success btn-sm" @click="downloadFile(cachedRequestSchema[i], file)">Unduh</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </Tab>
              </Tabs>
            </CollapsibleItem>
          </Collapsible>
        </Tab>
      </Tabs>
      <!-- section:control -->
      <Tabs class="tw-mb-8">
        <Tab v-if="cachedRequestSchema && cachedRequestSchema[0] && cachedRequestSchema[0].status === 'Pending'" title="Setujui Permohonan" class="tab__flex tw-shadow-lg">
          <div class="form">
            <div class="mb-3">
              <label for="inputNote">Tulis Catatan :</label>
              <textarea id="inputNote" v-model="note" class="form-control" />
            </div>
            <div class="mb-3 md:tw-flex tw-justify-between">
              <div class="tw-flex">
                <div class="tw-text-xs tw-px-4 md:tw-px-0 tw-text-gray-400 tw-self-center">
                  *Dengan menyetujui maka anda juga telah menandatangani formulir permohonan ini.
                </div>
              </div>
              <div class="tw-flex-1 tw-flex tw-flex-row tw-justify-end">
                <Button text="Tolak Permohonan" :icon="['fas', 'times']" :styles="['big', 'red']" @click.native="reject" />
                <Button text="Setujui Permohonan" :icon="['fas', 'check']" :styles="['big', 'blue']" @click.native="accept" />
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  </OverlayPage>
</template>

<script>
import { defineComponent, ref, onMounted, useContext } from '@nuxtjs/composition-api'
import { useCrud } from '@/api/crud'
import fileDownload from 'js-file-download'

export default defineComponent({
  props: {
    schemaId: {
      type: Number,
      required: true,
    },
    schema: {
      type: Object,
      required: true,
    },
    schemaRequestId: {
      type: [Number, Array],
      required: true,
    }
  },
  setup(props, { emit }) {
    const { $sleep, $swal, $axios, $overlayLoading } = useContext()
    const isLoading = ref(true)
    const schemaRequest = ref({})
    const close = () => emit('close')
    const crud = useCrud(`/admin/schemas/${props.schemaId}/requests`)
    const cachedRequestSchema = ref(null)
    const note = ref('')

    // mounted
    onMounted(async () => {
      const ids = Array.isArray(props.schemaRequestId) ? props.schemaRequestId : [props.schemaRequestId]
      cachedRequestSchema.value = []
      if (ids) {
        await $sleep(500)
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          try {
            const http = await crud.show(id)
            const data = http.data.data
            cachedRequestSchema.value.push(data)
          } catch (error) {
          }
        }
      }
      isLoading.value = false
    })

    // funcs
    const accept = async () => {
      $overlayLoading.show()
      const ids = ([...cachedRequestSchema.value].map(r => r.id)).join(',')
      const data = {
        note: note.value,
        status: 'Approved'
      }
      try {
        const http = await crud.update(ids, data, 'Yakin ingin menyetujui permohonan ini?')
        $overlayLoading.hide()
        if ([...http.data.data].length !== [...cachedRequestSchema.value].length) {
          await $swal({
            title: 'Warning',
            text: `Data dengan id "${([...http.data.data].join(', '))}" gagal disetujui.`,
            type: 'warning',
          })
        }
        close()
      } catch (error) {
        $overlayLoading.hide()
      }
    }
    const cancelApproved = async () => {
      $overlayLoading.show()
      const ids = ([...cachedRequestSchema.value].map(r => r.id)).join(',')
      const data = {
        note: note.value,
        status: 'Pending'
      }
      try {
        const http = await crud.update(ids, data, 'Yakin ingin membatalkan permohonan ini? Semua progres user ini akan terhapus semuanya!')
        $overlayLoading.hide()
        if ([...http.data.data].length !== [...cachedRequestSchema.value].length) {
          $swal({
            title: 'Warning',
            text: `Data dengan id "${([...http.data.data].join(', '))}" gagal dibatalkan penyetujuannya.`,
            type: 'warning',
          }).then(() => close())
        }
        close()
      } catch (error) {
        $overlayLoading.hide()
      }
    }
    const reject = async () => {
      $overlayLoading.show()
      const ids = ([...cachedRequestSchema.value].map(r => r.id)).join(',')
      const data = {
        note: note.value,
        status: 'Rejected'
      }
      try {
        const http = await crud.update(ids, data, 'Yakin ingin menolak permohonan ini?')
        $overlayLoading.hide()
        if ([...http.data.data].length !== [...cachedRequestSchema.value].length) {
          $swal({
            title: 'Warning',
            text: `Data dengan id "${([...http.data.data].join(', '))}" gagal di tolak.`,
            type: 'warning',
          }).then(() => close())
        }
        close()
      } catch (error) {
        $overlayLoading.hide()
      }
    }
    const cancelRejected = async () => {
      $overlayLoading.show()
      const ids = ([...cachedRequestSchema.value].map(r => r.id)).join(',')
      const data = {
        note: note.value,
        status: 'Pending'
      }
      try {
        const http = await crud.update(ids, data, 'Yakin ingin membatalkan penolakan ini?')
        $overlayLoading.hide()
        if ([...http.data.data].length !== [...cachedRequestSchema.value].length) {
          $swal({
            title: 'Warning',
            text: `Data dengan id "${([...http.data.data].join(', '))}" gagal dibatalkan penolakannya.`,
            type: 'warning',
          }).then(() => close())
        }
        close()
      } catch (error) {
        $overlayLoading.hide()
      }
    }

    //
    const downloadFile = async (schemaRequest, file) => {
      $overlayLoading.show()
      try {
        const response = await $axios({
          url: `/admin/schemas/${props.schemaId}/file/download/${file.id}`,
          method: 'GET',
          responseType: 'blob',
        })
        // console.log({ response, schemaRequest, fileDownload })
        fileDownload(response.data, `${props.schema.title}__${schemaRequest.user_name}__${file.name}`)
        console.log(file)
      } catch (error) {
      }
      $overlayLoading.hide()
    }

    return {
      isLoading,
      schemaRequest,
      cachedRequestSchema,
      note,
      close,

      accept,
      reject,
      cancelApproved,
      cancelRejected,

      downloadFile,
    }
  },
})
</script>

