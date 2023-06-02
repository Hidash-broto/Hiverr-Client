import { GridList } from '@material-ui/core'
import {useRef} from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { gigPageList } from '../../redux/ClientGigPage'
import useLazyLoading from '../lazyLoading/useLazyLoading'
import {LoadingPosts} from '../lazyLoading/LoadingPosts'
import clsx from "clsx";


function ClientHomeCards(searchData: any) {
  console.log(searchData, '80')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    const cards: any = [
        {
          name: 'Frontend Development',
          image: '/img/frontEndDevelopment.jpg'
        },
        {
          name: 'Marketing & advertising graphic design',
          image: '/img/marketing&AdvertisingGraphicDesign.jpg'
        },
        {
          name: 'Backend Development',
          image: 'https://assets-global.website-files.com/606a802fcaa89bc357508cad/611432b386bb6d5c574f91f3_1.png'
        },
        {
          name: 'Packaging graphic design',
          image: '/img/packagingGraphicDesign.jpg'
        },
        {
          name: 'Full Stack Web Development',
          image: '/img/fullStackWebDevelopment.jpg'
        },
        {
          name: 'Motion graphic design',
          image: '/img/MotionGraphicDesign.jpg'
        },
        {
          name: 'Web Design',
          image: '/img/WebDesign.jpg'
        },
        {
          name: 'Logo Design',
          image: '/img/LogoDesign.jpg'
        },
        {
          name: 'Banner Design',
          image: '/img/BannerDesign.jpg'
        }
      ]

      const NUM_PER_PAGE = 6;
      const TOTAL_PAGES = 3;
      const handleClick = (index: number) => {
        try {
          dispatch(gigPageList(cards[index].name))
          console.log(cards[index].name);
          navigate('/client/gigList');
        } catch (error: Error|any) {
          toast.error(error.message)
        }
      }
      const triggerRef = useRef(null);
      const onGrabData = (currentPage: number) => {
        return new Promise((resolve) => {
        setTimeout(() => {
            const data = cards.slice(
            ((currentPage - 1)%TOTAL_PAGES) * NUM_PER_PAGE,
            NUM_PER_PAGE * (currentPage%TOTAL_PAGES)
            );
            console.log(data);
            resolve(data);
          }, 1000);
        });
    };
    const { data, loading } = useLazyLoading({ triggerRef, onGrabData });
  return (
    <>
              <GridList cols={4} className='clienCardGroup'>
          {
            // eslint-disable-next-line array-callback-return
            data.filter((val: any) => {
              if(searchData.search === '') {
                return val
              } else if (val.name.toLowerCase().includes(searchData.search.toLowerCase())) {
                return val
              }
            }).map((card:Object[]|any, index:number) => {
              return(
                <div onClick={() => handleClick(index)} className="clientHomeCard">
                  <img className='clientHomeCardImg' src={card.image} alt="" />
                  <div className="clientHomeCardContent">
                    <h3 style={{position: 'absolute', marginTop: '11px', color: 'black', marginLeft: '10px'}}>{card.name}</h3>
                  </div>
                </div>
              )
            })
          }
          </GridList>
          <div ref={triggerRef} className={clsx('trigger', {visible: loading})}>
            <LoadingPosts />
          </div>
    </>
  )
}

export default ClientHomeCards
