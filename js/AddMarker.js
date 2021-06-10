AFRAME.registerComponent('add-marker', {
    init: async function () {
        var scene = document.querySelector('#scene')
        var dishes = await this.getDishes()
        dishes.map(dish => {
            var marker = document.createElement('a-marker')
            marker.setAttribute('id', dish.id)
            marker.setAttribute('type', 'pattern')
            marker.setAttribute('url', dish.markerPatternUrl)
            marker.setAttribute('cursor', {
                rayOrigin: 'mouse'
            })
            marker.setAttribute('marker-handler', {})
            scene.appendChild(marker)

            var model = document.createElement('a-entity')
            model.setAttribute('id', `model-${dish.id}`)
            model.setAttribute('position', dish.modelGeometry.position)
            model.setAttribute('rotation', dish.modelGeometry.rotation)
            model.setAttribute('scale', dish.modelGeometry.scale)
            model.setAttribute('gltf-model', `url(${dish.modelUrl})`)
            model.setAttribute('gesture-handler', {})
            marker.appendChild(model)

            var mainPlane = document.createElement('a-plane')
            mainPlane.setAttribute('id', `main-plane-${dish.id}`)
            mainPlane.setAttribute('position', {x:0, y:0, z:0})
            mainPlane.setAttribute('rotation', {x:-90, y:0, z:0})
            mainPlane.setAttribute('width', 1.5)
            mainPlane.setAttribute('height', 1.3)
            marker.appendChild(mainPlane)

            var titlePlane = document.createElement('a-plane')
            titlePlane.setAttribute('id', `title-plane-${dish.id}`)
            titlePlane.setAttribute('position', {x:0, y:0.9, z:0.02})
            titlePlane.setAttribute('rotation', {x:0, y:0, z:0})
            titlePlane.setAttribute('width', 1.4)
            titlePlane.setAttribute('height', 0.3)
            titlePlane.setAttribute('material', {color: 'pink'})
            mainPlane.appendChild(titlePlane)

            var dishTitle = document.createElement('a-entity')
            dishTitle.setAttribute('id', `dish-title-${dish.id}`)
            dishTitle.setAttribute('position', {x:0, y:0, z:0.01})
            dishTitle.setAttribute('rotation', {x:0, y:0, z:0})
            dishTitle.setAttribute('text', {
                font:'exo2semibold',
                value: dish.dishName.toUpperCase() ,
                color: 'black',
                width: 1.8,
                height: 1,
                align: 'center',
            })
            titlePlane.appendChild(dishTitle)

            var ingredients = document.createElement('a-entity')
            ingredients.setAttribute('id', `ingredients-${dish.id}`)
            ingredients.setAttribute('position', {x:0, y:0, z:0.1})
            ingredients.setAttribute('rotation', {x:0, y:0, z:0})
            ingredients.setAttribute('text', {
                font:'dejavu', 
                color: 'blue',
                width: 1.8,
                value: `${dish.Ingridients.join('\n\n')}` , 
                align: 'center'
            })
            mainPlane.appendChild(ingredients)
        })
    },

    getDishes : async () => {
        return await firebase.firestore().collection('dishes').get().then(snapshot => {
            return snapshot.docs.map(doc => doc.data())
        })
    }
});
