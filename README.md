# Super Castlevania IV
Proyecto final de la asignatura Desarrollo de Videojuegos mediante Tecnologias Web de la Universidad Complutense de Madrid.

# Índice

* [1.- Diseño del juego](https://github.com/DVI-SC4/SuperCastlevania4#1-dise%C3%B1o-del-juego)
	* [1. Objetivo del juego](https://github.com/DVI-SC4/SuperCastlevania4#1-objetivo-del-juego) 
	* [2. Principales mecánicas](https://github.com/DVI-SC4/SuperCastlevania4#2-principales-mec%C3%A1nicas)
	* [3. Personajes](https://github.com/DVI-SC4/SuperCastlevania4#3-personajes)
* [2.- Diseño de la implementación](https://github.com/DVI-SC4/SuperCastlevania4#2-dise%C3%B1o-de-la-implementaci%C3%B3n)
* [3.- Equipo de trabajo y reparto de tareas](https://github.com/DVI-SC4/SuperCastlevania4#3-equipo-de-trabajo-y-reparto-de-tareas)
* [4.- Fuentes y referencias](https://github.com/DVI-SC4/SuperCastlevania4#4-fuentes-y-referencias)

# 1. Diseño del juego

(se puede confeccionar a partir del documento de concepto entregado anteriormente, ampliando con las nuevas mecánicas añadidas y explicando mínimamente en qué consisten. Acompañar de algunas imágenes o capturas de nuestros recursos o cosas ya implementadas)
	
## 1. Objetivo del juego

En nuestra versión reducida de Super Castlevania IV podemos a jugar al primer nivel del juego, en el cual entramos al castillo y atravesamos parte de unos jardines y un edificio anexo, ambos plagados de los enemigos básicos. 

Como en el original, el objetivo principal del nivel es avanzar hasta su final y, una vez allí, enfrentarse y derrotar al jefe final. Opcionalmente, podemos recoger armas secundarias en el camino que nos ayuden un poco más a la hora de luchar. Una vez derrotado el jefe, una esfera brillante aparece y, al recogerla, queda completado el nivel.

Nada más entrar al castillo, estaremos expuestos a las hordas de enemigos y en peligro constante. Los monstruos pueden atacar al protagonista hasta agotar su barra de energía progresivamente. Si Simon se queda sin energía, quedará inconsciente y perderá una vida. Reaparecerá en un punto del nivel acorde al avance que llevase dentro del mismo. Si Simon se queda sin vidas, la partida se acabará y se le dará la oportunidad de volver a empezar el nivel desde cero o de volver al menú. Cabe destacar que nuestro personaje también puede perder una vida súbitamente si cae al agua o a algún foso.

## 2. Principales mecánicas

### 1. Avance y retroceso

Simon puede caminar en ambos sentidos pulsando las teclas de dirección "izquierda" y "derecha".

### 2. Agacharse

Para esquivar ciertos ataques, nuestro protagonista puede agacharse usando la tecla de dirección "abajo". Asimismo, mientras se encuentra agachado, puede seguir avanzando o retrocediendo en cuclillas si la situación lo requiere.

### 3. Salto

Simon también puede saltar pulsando la tecla "Q". Para mayor agilidad, durante el breve salto puede cambiar el sentido de su avance si pulsa "izquierda" o "derecha".

### 4. Subir y bajar escaleras

Como parte indispensable de su avance por el nivel, Simon también es capaz de subir o bajar escaleras. 
* Para subir, al situarse encima del pie de las escaleras pulsará "derecha" o "izquierda" (según el sentido de la escalera) seguido de "arriba" y comenzará el ascenso.
* Para bajar, bastará con avanzar (sea hacia la izquierda o hacia la derecha) hacia la escalera en cuestión y comenzará el descenso. Si la escalera no está al final de una plataforma sino en medio de una, se combinará el uso de "izquierda" o "derecha" seguida de la tecla "abajo".

### 5. Ataque

(decir lo de que se actualiza a morning star, que es así más largo o con mayor alcance, y que hace mas daño por cada asestada)

El arma principal de Simon es el legendario látigo "Vampire Killer", el cual ha pasado de generación en generación en la familia Belmont durante siglos y el cual posee habilidades mágicas para luchar contra las criaturas infernales. 

Mediante la tecla "W", Simon enarbolará el látigo para asestar golpes a sus enemigos hasta destruirles. Disponemos de distintas combinaciones de ataque para usar las que mejor se ajusten a la situación en la que Simon se vea envuelto:

* Ataque normal: se ataca de pie y de forma horizontal, en la dirección en la que Simon esté mirando.
* Ataque agachado: tras pulsar "abajo", si después activamos el látigo, éste dirigirá un ataque horizontal también en la dirección en que se esté mirando pero, esta vez, con una menor altura.
* Ataque vertical
* Ataque diagonal
* Ataques durante el salto

### 6. Uso de armas secundarias

(decidir con qué tecla se activarán)

## 3. Personajes

### 1. Simon Belmont

### 2. Enemigos

### 3. Jefe final


# 2. Diseño de la implementación

(arquitectura y principales componentes.)


# 3. Equipo de trabajo y reparto de tareas

(descripción del trabajo realizado por cada uno de los integrantes del grupo y carga de trabajo realizada (0%-100%).)

## 1. Integrantes
* [César Godino Rodríguez](https://github.com/cloudgrey)
* [Carmen López Gonzalo](https://github.com/calope03)
* [Sergio Pino Holgado](https://github.com/sepino)

## 2. Tareas realizadas por cada integrante

## 3. Carga de trabajo


# 4. Fuentes y referencias

(referencias a todos los assets utilizados en la realización del juego.)


