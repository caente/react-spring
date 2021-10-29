package com.dimeder.demobackend.models

import javax.persistence.*

@Entity
@Table(name = "coffeeshops")
data class CoffeeShopModel(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = -1,
    var name: String = "",
    var address: String = "",
    var phone: String = "",
    var priceOfCoffee: Double = 0.0,
    var powerAccessible: Boolean = true,
    var internetReliability: Short = 3 // 1-5
) {}

