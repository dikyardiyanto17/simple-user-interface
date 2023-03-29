const Task = require("../schema/Task");

class Tasks {
  static async newTask(req, res, next) {
    try {
      const { judul, deskripsi } =
        req.body;
      if (!judul) {
        throw { name: "Bad Request", message: "Judul tidak boleh kosong" };
      }
      await Task.create({judul, deskripsi});
      return res.status(201).json({ message: "Berhasil membuat tugas dengan judul : " + judul });
    } catch (error) {
      next(error);
    }
  }

  static async findTasks(req, res, next) {
    try {
      let data = await Task.find();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async findTask(req, res, next) {
    try {
      const { id } = req.params;
      let data = await Task.findById(id);
      if (!data?.judul){
        throw {name: "Tugas tidak ada", message: "Tugas yang dicari tidak ada"}
      }
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const { judul, deskripsi, selesai } = req.body;
      const { id } = req.params;
      let data = await Task.findById(id);
      if (!data?.judul){
        throw {name: "Tugas tidak ada", message: "Tugas yang dicari tidak ada"}
      }
      let updatingData = {};
      if (!judul && !deskripsi && !selesai){
        throw {name: 'Bad Request', message: "Tugas tidak diperbarui karena tidak ada yang di ubah"}
      }
      if (judul) {
        updatingData.judul = judul;
      }
      if (deskripsi) {
        updatingData.deskripsi = deskripsi;
      }
      if (selesai) {
        updatingData.selesai = selesai;
      }
      await Task.findOneAndUpdate(
        {
          _id: id,
        },
        updatingData
      );
      return res
        .status(200)
        .json({ message: "Tugas berhasil diperbarui"});
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Task.findById(id);
      if (!data?.judul){
        throw {name: "Tugas tidak ada", message: "Tugas yang dicari tidak ada"}
      }
      await Task.findByIdAndDelete(id);
      return res.status(200).json({ message: "Berhasil menghapus tugas" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { Tasks };
