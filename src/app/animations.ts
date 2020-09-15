import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, stagger
} from '@angular/animations';

export const transAnimation = animation([
    style({
        height: '{{ height }}',
        opacity: '{{ opacity }}',
        backgroundColor: '{{ backgroundColor }}'
    }),
    animate('{{ time }}')
]);


export const listStaggerCreative =
    trigger('listStaggerCreative', [
        transition('* <=> *', [
            query(
                ':enter',
                [
                    style({ opacity: 0, transform: 'translateY(-15px)' }),
                    stagger(
                        '.1s',
                        animate(
                            '.4s ease-in-out',
                            style({ opacity: 1, transform: 'translateY(0px)' })
                        )
                    )
                ],
                { optional: true }
            ),
            query(':leave', animate('50ms', style({ opacity: 0 })), {
                optional: true
            })
        ])
    ]);

export const listStaggerDev =
    trigger('listStaggerDev', [
        transition('* <=> *', [
            query(
                ':enter',
                [
                    style({ opacity: 0, transform: 'translateY(-15px)' }),
                    stagger(
                        '.3s',
                        animate(
                            '.5s ease-out',
                            style({ opacity: 1, transform: 'translateY(0px)' })
                        )
                    )
                ],
                { optional: true }
            ),
            query(':leave', animate('50ms', style({ opacity: 0 })), {
                optional: true
            })
        ])
    ]);