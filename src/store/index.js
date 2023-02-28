import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";

import home from "./modules/home";

import document from "./modules/document";
import suratTugas from "./modules/surat-tugas";
import suratKeterangan from "./modules/surat-keterangan";

import pengajuanSurat from "./modules/pengajuan-surat";

// Setup

import tagGroup from "./modules/tag-group";

import mahasiswa from "./modules/mahasiswa";
import pegawai from "./modules/pegawai";
import userManagement from "./modules/user-management";

export default new Vuex.Store({
  modules: {
    app,
    home,
    document,
    suratTugas,
    suratKeterangan,
    pengajuanSurat,
    tagGroup,
    mahasiswa,
    pegawai,
    userManagement,
  },
});
