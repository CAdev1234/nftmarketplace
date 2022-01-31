import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const MyKeenSlider = ({renderEle, numView}) => {

    const [refCallback, slider, sliderNode] = useKeenSlider(
        {
          rtl: false,
            
          slides: {
              perView: numView,
              spacing: 15
          },
          slideChanged() {
            console.log('slide changed')
          },
        },
        [
          // add plugins here
        ]
    )
    
    return (
        <>
            <div ref={refCallback} className="keen-slider">
                {renderEle}
            </div>
        </>
    )
}

export default MyKeenSlider