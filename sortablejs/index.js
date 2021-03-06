(function () {
    for (let key in Sortable) {
        console.log(key);
    }
    /* const MultiDrag = Sortable.MultiDrag;

    console.log(MultiDrag);
    Sortable.mount(new MultiDrag()); */

    var sortable = new Sortable(document.querySelector('.items-w'), {
        group: 'items-w',
        animation: 300,
        multiDrag: true,
        selectedClass: 'multi-select',
        onEnd (e) {
            var moveItem = e.to.children[e.newIndex];
            console.log(sortable.toArray());
            if (e.from !== e.to) {
                e.from.insertBefore(moveItem, e.from.children.length && e.from.children[e.oldIndex]);
            }
            console.log(sortable.toArray());
            console.log(e);
        },
        /* store: {
            get (a) {
                console.log('get:', a);
            },
            set (b) {
                console.log(b);
            }
        }, */
        /* onMove (e, originE) {
            console.log(e);
            console.log(originE);
        } */
    });
    var sortable2 = new Sortable(document.querySelector('.items-w2'), {
        group: 'items-w',
        filter: '.filter',
        ghostClass: 'ghost-calss',
        chosenClass: 'chosen-class',
        animation: 150,
        onEnd (e) {
            console.log(e);
        },
       /*  store: {
            get (a) {
            },
            set (b) {
            }
        },
        onMove (e, originE) {
            console.log(e);
            console.log(originE);
        } */
    });
})();