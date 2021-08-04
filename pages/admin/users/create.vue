<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Tambah" :data="[{ text: 'User', link: '/admin/users' }]" />
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
          </div>
        </form>
      </div>
    </div>
    <div class="panel-footer">
      <div class="tw-flex tw-flex-col">
        <Button text="SIMPAN" :styles="[ 'big', 'blue' ]" :icon="['fas', 'save']" @click.native="save" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive
} from '@nuxtjs/composition-api'
import { useCrud } from '@/api/crud.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup (_props, { root }) {
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
    const { save } = useCustomCrud(root, form, useCrud('/admin/users'), goBack)
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

    return {
      goBack,
      form,
      save,
      selects
    }
  }
}

function useCustomCrud (_root, input, crud, goBack) {
  const save = () => {
    const data = input
    crud.create(data).then(() => {
      goBack()
    })
  }

  return {
    save
  }
}
</script>
