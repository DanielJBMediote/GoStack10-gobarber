import File from '../models/File';

class FileController {

  /**
   * Método para armazenar um Arquivo no servidor
   * @param {*} request Object JSON
   * @param {*} respone Object JSON
   */
  async store(request, respone){
    const { originalname: name, filename: path } = request.file;

    const file = await File.create({
      name,
      path
    });
    return respone.json(file);
  }
}

export default new FileController();
