<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Edit" :data="[{ text: 'User', link: '/admin/users' },{ text: (user) ? user.name : '' }]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="goBack" />
      </div>
      <div class="ribbon">
        <h2>USER</h2>
      </div>
      <div />
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-y-auto">
      <div class="container-center">
        <form class="my-4 p-4">
          <div class="mb-3">
            <label for="inputName" class="form-label">Nama</label>
            <input id="inputName" v-model="form.name" type="text" class="form-control" placeholder="Nama">
          </div>
          <div class="mb-3">
            <label for="inputUsername" class="form-label">Username</label>
            <input id="inputUsername" v-model="form.username" type="text" class="form-control" placeholder="Username">
          </div>
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Email</label>
            <input id="inputEmail" v-model="form.email" type="email" class="form-control" placeholder="Email">
          </div>
          <div class="mb-3">
            <label for="inputPhone" class="form-label">Nomor Telepon</label>
            <input id="inputPhone" v-model="form.phone" type="text" class="form-control" placeholder="Nomor Telepon">
          </div>
          <div class="mb-3">
            <label for="inputRole" class="form-label">Role</label>
            <select id="input-role" v-model="form.role" name="role" class="form-control">
              <option v-for="(item, i) in selects.role" :key="i" :value="item">
                {{ i }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="inputStatus" class="form-label">Status</label>
            <select id="input-Status" v-model="form.status" name="Status" class="form-control">
              <option v-for="(item, i) in selects.status" :key="i" :value="item">
                {{ i }}
              </option>
            </select>
          </div>
          <hr>
          <div class="mb-3">
            <label for="inputPassword" class="form-label">Password</label>
            <input id="inputPassword" v-model="form.password" type="text" class="form-control" placeholder="Password">
            <span class="tw-text-red-400 tw-text-xs">
              *Biarkan kosong jika tidak ingin mengganti
            </span>
          </div>
        </form>
      </div>
    </div>
    <div class="tw-bg-gray-200 tw-px-4 tw-py-4 tw-flex tw-flex-row tw-justify-around">
      <div class="tw-flex tw-flex-col">
        <Button text="SIMPAN PERUBAHAN" :styles="[ 'big', 'blue' ]" :icon="['fas', 'save']" @click.native="beforeSave" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  useFetch,
  useContext,
  ref
} from '@nuxtjs/composition-api'
import { useCrud, inputOnly } from '@/api/crud.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup (_props, { root }) {
    const { params, $overlayLoading } = useContext()
    const goBack = () => root.$router.push('/admin/users')
    const form = reactive({
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      role: 'Accession',
      status: 'Active'
    })
    const user = ref(null)
    const { save, show } = useCustomCrud(root, form, useCrud('/admin/users'), goBack)
    const selects = {
      role: {
        Asesor: 'Assessor',
        Asesi: 'Accession',
        Admin: 'Admin'
      },
      status: {
        Aktif: 'Active',
        'Tidak Aktif': 'Inactive',
        Suspend: 'Suspended'
      }
    }

    // fecth
    const { fetch } = useFetch(async () => {
      const id = params.value.userId
      $overlayLoading.show()
      try {
        const result = await show(id)
        const data = result.data.data
        user.value = data
        inputOnly(form, data, ['name', 'username', 'email', 'phone', 'password', 'role', 'status'])
      } catch (error) {
        goBack()
      }
      $overlayLoading.hide()
    })
    fetch()

    // bf
    const beforeSave = async () => {
      const id = params.value.userId
      try {
        $overlayLoading.show()
        await save(id)
        goBack()
      } catch (error) {
      }
      $overlayLoading.hide()
    }

    // return
    return {
      goBack,
      form,
      beforeSave,
      selects,
      user
    }
  }
}

function useCustomCrud (_root, input, crud, goBack) {
  const save = (id) => {
    const data = input
    return crud.update(id, data)
  }

  const show = id => crud.show(id)

  return {
    save,
    show
  }
}
</script>
