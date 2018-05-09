# Super Castlevania IV
Proyecto final de la asignatura Desarrollo de Videojuegos mediante Tecnologias Web de la Universidad Complutense de Madrid.

# Índice

* [1.- Diseño del juego](https://github.com/DVI-SC4/SuperCastlevania4#1-dise%C3%B1o-del-juego)
	* [1.1. Objetivo del juego](https://github.com/DVI-SC4/SuperCastlevania4#1-objetivo-del-juego) 
	* [1.2. Principales mecánicas](https://github.com/DVI-SC4/SuperCastlevania4#2-principales-mec%C3%A1nicas)
	* [1.3. Personajes](https://github.com/DVI-SC4/SuperCastlevania4#3-personajes)
* [2.- Diseño de la implementación](https://github.com/DVI-SC4/SuperCastlevania4#2-dise%C3%B1o-de-la-implementaci%C3%B3n)
* [3.- Equipo de trabajo y reparto de tareas](https://github.com/DVI-SC4/SuperCastlevania4#3-equipo-de-trabajo-y-reparto-de-tareas)
* [4.- Fuentes y referencias](https://github.com/DVI-SC4/SuperCastlevania4#4-fuentes-y-referencias)

# 1. Diseño del juego

(se puede confeccionar a partir del documento de concepto entregado anteriormente, ampliando con las nuevas mecánicas añadidas y explicando mínimamente en qué consisten. Acompañar de algunas imágenes o capturas de nuestros recursos o cosas ya implementadas)
	
## 1.1. Objetivo del juego

En nuestra versión reducida de Super Castlevania IV podemos a jugar al primer nivel del juego, en el cual entramos al castillo y atravesamos parte de unos jardines y un edificio anexo, ambos plagados de los enemigos básicos. 

Como en el original, el objetivo principal del nivel es avanzar hasta su final y, una vez allí, enfrentarse y derrotar al jefe final. Opcionalmente, podemos recoger armas secundarias en el camino que nos ayuden un poco más a la hora de luchar. Una vez derrotado el jefe, una esfera brillante aparece y, al recogerla, queda completado el nivel.

Nada más entrar al castillo, estaremos expuestos a las hordas de enemigos y en peligro constante. Los monstruos pueden atacar al protagonista hasta agotar su barra de energía progresivamente. Si Simon se queda sin energía, quedará inconsciente y perderá una vida. Reaparecerá en un punto del nivel acorde al avance que llevase dentro del mismo. Si Simon se queda sin vidas, la partida se acabará y se le dará la oportunidad de volver a empezar el nivel desde cero o de volver al menú. Cabe destacar que nuestro personaje también puede perder una vida súbitamente si cae al agua o a algún foso.

## 1.2. Principales mecánicas

### 1. Avance y retroceso

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/teclas_andando.png?raw=true" width="11%" />

![andando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/andando.gif?raw=true)

Simon puede caminar en ambos sentidos pulsando las teclas de dirección "izquierda" y "derecha".

### 2. Agacharse

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/teclas_agacharse.png?raw=true" width="20%" />

![agacharse](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/agacharse.gif?raw=true)

Para esquivar ciertos ataques, nuestro protagonista puede agacharse usando la tecla de dirección "abajo". Asimismo, mientras se encuentra agachado, puede seguir avanzando o retrocediendo en cuclillas si la situación lo requiere.

### 3. Salto

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/teclas_saltando.png?raw=true" width="20%" />

![saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/saltando.gif?raw=true)

Simon también puede saltar pulsando la tecla "Q". Para mayor agilidad, durante el breve salto puede cambiar el sentido de su avance si pulsa "izquierda" o "derecha".

### 4. Subir y bajar escaleras

(se pondrán las teclas y gif cuando esté implementado)

Como parte indispensable de su avance por el nivel, Simon también es capaz de subir o bajar escaleras. 
* Para subir, al situarse encima del pie de las escaleras pulsará "derecha" o "izquierda" (según el sentido de la escalera) seguido de "arriba" y comenzará el ascenso.
* Para bajar, bastará con avanzar (sea hacia la izquierda o hacia la derecha) hacia la escalera en cuestión y comenzará el descenso. Si la escalera no está al final de una plataforma sino en medio de una, se combinará el uso de "izquierda" o "derecha" seguida de la tecla "abajo".

### 5. Ataque

El arma principal de Simon es el legendario látigo "Vampire Killer", el cual ha pasado de generación en generación en la familia Belmont durante siglos. Este arma de cazavampiros posee habilidades mágicas para luchar contra las criaturas infernales. 

Mediante la tecla "W", Simon enarbolará el látigo para asestar golpes a sus enemigos hasta destruirles. Además, durante la partida podrá recoger un hechizo de mejora que convierte al látigo en "Morning Star", haciéndolo más largo, férreo y permitiéndole hacer más daño por cada ataque.

Disponemos de distintas combinaciones de ataque, en ambas direcciones, para usar las que mejor se ajusten a la situación en la que Simon se vea envuelto.

#### 5.1 Ataques desde el suelo

##### 5.1.1 Ataque normal

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/teclas/W.png?raw=true" width="5%" />

![atacando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/atacando.gif?raw=true)

##### 5.1.2 Ataque agachado

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/teclas_atacando_agachado.png?raw=true" width="14%" />

![atacando_agachado](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/atacando_agachado.gif?raw=true)

##### 5.1.3 Ataque en vertical

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/teclas_atacando_vertical.png?raw=true" width="14%" />

![atacando_haciarriba](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/atacando_vertical.gif?raw=true)

##### 5.1.4 Ataque en diagonal

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/teclas_ataque_diagonal.png?raw=true" width="24%" />

![atacando_diagonal](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/ataque_diagonal.gif?raw=true)

#### 5.2 Ataques en el aire

##### 5.2.1 Ataque normal saltando

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/teclas_atacando_saltando.png?raw=true" width="24%" />

![atacando_saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/atacando_saltando.gif?raw=true)

##### 5.2.2 Ataque en vertical saltando

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/teclas_atacando_vertical_saltando.png?raw=true" width="24%" />

![atacando_verticalarriba_saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/atacando_vertical_saltando.gif?raw=true)

##### 5.2.3 Ataque hacia abajo saltando

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/teclas_atacando_verticalabajo.png?raw=true" width="24%" />

![atacando_verticalabajo_saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/atacando_verticalabajo.gif?raw=true)

##### 5.2.4 Ataque en diagonal saltando

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/teclas_atacando_diagonalarriba_saltando.png?raw=true" width="24%" />

![atacando_diagonal_saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/atacando_diagonalarriba_saltando.gif?raw=true)

##### 5.2.5 Ataque en diagonal hacia abajo saltando

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/teclas_atacando_diagonalabajo_saltando.png?raw=true" width="24%" />

![atacando_diagonal_abajo_saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/atacando_diagonalabajo_saltando.gif?raw=true)

### 6. Uso de armas secundarias

(decidir con qué tecla se activarán y hacer su gif e imagen de tecla. Yo lo pondría con la tecla E por facilidad de activarlas rápidamente)

## 1.3. Personajes

### 1. Simon Belmont

![Simon Belmont](https://i.gifer.com/1Pu8.gif)

Simon es un reconocido cazador de vampiros del siglo XVII, y también el primero en aparecer y uno de los más reconocidos de los héroes de la saga Castlevania. Es heredero del clan Belmont y del afamado látigo Matavampiros (Vampire Killer), convirtiéndose en el más famoso cazador de vampiros. 

Nacido alrededor del año 1669, Simon creció escuchando las historias de sus grandes antepasados que habían derrotado a Drácula, junto con aquellos que lo ayudaron. Mientras se entrenaba en las habilidades del látigo, solía preguntarse cómo estaría a la altura de estos guerreros legendarios.

A la edad de 22 años en el año 1691, tendría la oportunidad de demostrar que era digno del legado de su familia. En el día de Pascua, 100 años después de que fue derrotado por Christopher Belmont, el conde Drácula regresaba de nuevo al mundo de los vivos. Simon estaba determinado a poner fin a la amenaza de este nuevo reinado de terror, y entró solo en el castillo de Drácula para enfrentar al conde.

Simon es bastante temerario e inclinado a forzar su camino a través de las situaciones adversas y para su aventura lleva un peto hecho de cuero, botas altas y una diadema de metal.

### 2. Enemigos

### 3. Jefe final


# 2. Diseño de la implementación

(arquitectura y principales componentes.)


# 3. Equipo de trabajo y reparto de tareas

## 3.1. Integrantes

![Team](https://m.popkey.co/bcb243/azGKx_s-200x150.gif)

* [César Godino Rodríguez](https://github.com/cloudgrey)
* [Carmen López Gonzalo](https://github.com/calope03)
* [Sergio Pino Holgado](https://github.com/sepino)

## 3.2. Tareas realizadas por cada integrante

(descripción del trabajo realizado por cada uno de los integrantes del grupo, poner aquí lo del registro de tareas)

## 3.3. Carga de trabajo

(a cada miembro se le asigna un porcentaje)

# 4. Fuentes y referencias

(referencias a todos los assets utilizados en la realización del juego.)


