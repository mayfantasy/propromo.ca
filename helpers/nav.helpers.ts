import { INavItem } from 'types/utils.types'
import { pageRoutes } from './route.helpers'
import { IProductCollectionHandles } from './collection.helpers'

const c = (handle: IProductCollectionHandles) => {
  return pageRoutes.productListPage(handle)
}

export const productCollectionItems: INavItem[] = [
  // {
  //   name: 'All Products',
  //   key: IProductCollectionHandles.all,
  //   url: c(IProductCollectionHandles.all).url,
  //   dynamicUrl: c(IProductCollectionHandles.all).dynamicUrl
  // },
  {
    name: 'Best Sellers',
    key: IProductCollectionHandles.best_seller,
    url: c(IProductCollectionHandles.best_seller).url,
    dynamicUrl: c(IProductCollectionHandles.best_seller).dynamicUrl
  },
  {
    name: 'Displays',
    key: IProductCollectionHandles.displays,
    url: c(IProductCollectionHandles.displays).url,
    dynamicUrl: c(IProductCollectionHandles.displays).dynamicUrl,
    children: [
      {
        name: 'Acrylic Signs',
        key: IProductCollectionHandles.acrylic_sign,
        url: c(IProductCollectionHandles.acrylic_sign).url,
        dynamicUrl: c(IProductCollectionHandles.acrylic_sign).dynamicUrl
      },
      {
        name: 'Banner Stands',
        key: IProductCollectionHandles.banner_stands,
        url: c(IProductCollectionHandles.banner_stands).url,
        dynamicUrl: c(IProductCollectionHandles.banner_stands).dynamicUrl
      },
      {
        name: 'Crowd Control Systems',
        key: IProductCollectionHandles.crowd_control_systems,
        url: c(IProductCollectionHandles.crowd_control_systems).url,
        dynamicUrl: c(IProductCollectionHandles.crowd_control_systems)
          .dynamicUrl
      },
      /**
       * ||================
       * || Upcoming
       */
      // {
      //   name: 'Backdrop Stands and Pop-up Display',
      //   key: IProductCollectionHandles.backdrop-stands-pop-up-display,
      //   url: c(IProductCollectionHandles.backdrop-stands-pop-up-display).url,
      //   dynamicUrl: c(IProductCollectionHandles.backdrop-stands-pop-up-display')
      //     .dynamicUrl
      // },
      /**
       * ||================
       * || Upcoming
       */
      // {
      //   name: 'Flags',
      //   key: IProductCollectionHandles.flags,
      //   url: c(IProductCollectionHandles.flags).url,
      //   dynamicUrl: c(IProductCollectionHandles.flags).dynamicUrl
      // },
      {
        name: 'Brochure and Newspaper Holders',
        key: IProductCollectionHandles.brochure_and_newspaper_holders,
        url: c(IProductCollectionHandles.brochure_and_newspaper_holders).url,
        dynamicUrl: c(IProductCollectionHandles.brochure_and_newspaper_holders)
          .dynamicUrl
      },
      {
        name: 'Floor Sign Holders',
        key: IProductCollectionHandles.floor_sign_holders,
        url: c(IProductCollectionHandles.floor_sign_holders).url,
        dynamicUrl: c(IProductCollectionHandles.floor_sign_holders).dynamicUrl
      },
      {
        name: 'Metal A-Frame Sign Holders',
        key: IProductCollectionHandles.metal_a_frame_sign_holders,
        url: c(IProductCollectionHandles.metal_a_frame_sign_holders).url,
        dynamicUrl: c(IProductCollectionHandles.metal_a_frame_sign_holders)
          .dynamicUrl
      },
      {
        name: 'Metal Lawn Sign Holders',
        key: IProductCollectionHandles.metal_lawn_sign_holders,
        url: c(IProductCollectionHandles.metal_lawn_sign_holders).url,
        dynamicUrl: c(IProductCollectionHandles.metal_lawn_sign_holders)
          .dynamicUrl
      },
      {
        name: 'PVC A-Boards',
        key: IProductCollectionHandles.pvc_a_boards,
        url: c(IProductCollectionHandles.pvc_a_boards).url,
        dynamicUrl: c(IProductCollectionHandles.pvc_a_boards).dynamicUrl
      },
      {
        name: 'Frame Sign Holders',
        key: IProductCollectionHandles.frame_sign_holders,
        url: c(IProductCollectionHandles.frame_sign_holders).url,
        dynamicUrl: c(IProductCollectionHandles.frame_sign_holders).dynamicUrl
      },
      {
        name: 'Standoffs and Cable wire System',
        key: IProductCollectionHandles.standoffs_and_cable_wire_system,
        url: c(IProductCollectionHandles.standoffs_and_cable_wire_system).url,
        dynamicUrl: c(IProductCollectionHandles.standoffs_and_cable_wire_system)
          .dynamicUrl
      },
      {
        name: 'Wind Resistant Sign Holders',
        key: IProductCollectionHandles.wind_resistant_sign_holders,
        url: c(IProductCollectionHandles.wind_resistant_sign_holders).url,
        dynamicUrl: c(IProductCollectionHandles.wind_resistant_sign_holders)
          .dynamicUrl
      },
      {
        name: 'Way Finding Signs',
        key: IProductCollectionHandles.way_finding_signs,
        url: c(IProductCollectionHandles.way_finding_signs).url,
        dynamicUrl: c(IProductCollectionHandles.way_finding_signs).dynamicUrl
      },
      {
        name: 'Thermal POS Paper Roll',
        key: IProductCollectionHandles.thermal_pos_paper_roll,
        url: c(IProductCollectionHandles.thermal_pos_paper_roll).url,
        dynamicUrl: c(IProductCollectionHandles.thermal_pos_paper_roll)
          .dynamicUrl
      }
    ]
  },
  {
    name: 'Prints',
    key: IProductCollectionHandles.prints,
    url: c(IProductCollectionHandles.prints).url,
    dynamicUrl: c(IProductCollectionHandles.prints).dynamicUrl,
    groupSetting: [
      { from: 0, to: 4, title: 'Signs' },
      { from: 4, to: 11, title: 'Offset & Digital' }
    ],
    children: [
      // ===============
      // ===============
      // Offset & Digital
      {
        name: 'For Sale Sign',
        key: IProductCollectionHandles.for_sale_sign,
        url: c(IProductCollectionHandles.for_sale_sign).url,
        dynamicUrl: c(IProductCollectionHandles.for_sale_sign).dynamicUrl
      },
      {
        name: 'Direction Sign',
        key: IProductCollectionHandles.direction_sign,
        url: c(IProductCollectionHandles.direction_sign).url,
        dynamicUrl: c(IProductCollectionHandles.direction_sign).dynamicUrl
      },
      {
        name: 'Floor Stand Insert',
        key: IProductCollectionHandles.floor_stand_insert,
        url: c(IProductCollectionHandles.floor_stand_insert).url,
        dynamicUrl: c(IProductCollectionHandles.floor_stand_insert).dynamicUrl
      },
      {
        name: 'Sidewalk Sign Insert',
        key: IProductCollectionHandles.sidewalk_sign_insert,
        url: c(IProductCollectionHandles.sidewalk_sign_insert).url,
        dynamicUrl: c(IProductCollectionHandles.sidewalk_sign_insert).dynamicUrl
      },
      // ===============
      // ===============
      {
        name: 'Business Card',
        key: IProductCollectionHandles.business_card,
        url: c(IProductCollectionHandles.business_card).url,
        dynamicUrl: c(IProductCollectionHandles.business_card).dynamicUrl
      },
      {
        name: 'Postcard',
        key: IProductCollectionHandles.postcard,
        url: c(IProductCollectionHandles.postcard).url,
        dynamicUrl: c(IProductCollectionHandles.postcard).dynamicUrl
      },
      {
        name: 'Flyer',
        key: IProductCollectionHandles.flyer,
        url: c(IProductCollectionHandles.flyer).url,
        dynamicUrl: c(IProductCollectionHandles.flyer).dynamicUrl
      },
      {
        name: 'Brochure',
        key: IProductCollectionHandles.brochure,
        url: c(IProductCollectionHandles.brochure).url,
        dynamicUrl: c(IProductCollectionHandles.brochure).dynamicUrl
      },
      {
        name: 'Poster',
        key: IProductCollectionHandles.poster,
        url: c(IProductCollectionHandles.poster).url,
        dynamicUrl: c(IProductCollectionHandles.poster).dynamicUrl
      },
      {
        name: 'Feature Page',
        key: IProductCollectionHandles.feature_page,
        url: c(IProductCollectionHandles.feature_page).url,
        dynamicUrl: c(IProductCollectionHandles.feature_page).dynamicUrl
      },
      {
        name: 'Presentation Folder',
        key: IProductCollectionHandles.presentation_folder,
        url: c(IProductCollectionHandles.presentation_folder).url,
        dynamicUrl: c(IProductCollectionHandles.presentation_folder).dynamicUrl
      }
      /**
       * ||================
       * || Upcoming
       */
      // {
      //   name: 'Flag Print',
      //   key: IProductCollectionHandles.flag_print,
      //   url: c(IProductCollectionHandles.flag_print).url,
      //   dynamicUrl: c(IProductCollectionHandles.flag_print).dynamicUrl
      // },
    ]
  }
]

export const bottomHeaderItems: INavItem[] = [
  pageRoutes.homePage,
  pageRoutes.aboutPage,
  ...productCollectionItems,
  pageRoutes.contactPage
]
