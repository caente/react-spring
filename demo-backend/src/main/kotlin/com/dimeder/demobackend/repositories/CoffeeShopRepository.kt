package com.dimeder.demobackend.repositories

import com.dimeder.demobackend.models.CoffeeShopModel
import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "coffeeshops", path = "coffeeshops")
interface CoffeeShopRepository: CrudRepository<CoffeeShopModel, Long> {
}