import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"

class CreateTagService {
  async execute(name: string) {
    const tagsRepository = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error('tag incorrect')
    }

    const tagAlreadyExists = await tagsRepository.findOne({ name })

    if (tagAlreadyExists) {
      throw new Error('tag already exists')
    }

    const tag = tagsRepository.create({ name })

    await tagsRepository.save(tag)

    return tag;
  }
}

export { CreateTagService }