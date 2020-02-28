import File from '../models/File';

class FileController {
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
