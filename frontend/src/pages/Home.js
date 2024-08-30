import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/> 

      <HorizontalCardProduct category={"BackTrainer"} heading={"Top Back Exercise Equipments"}/>
      <HorizontalCardProduct category={"CardioGear"} heading={"Top Cardio Equipments"}/>

      <VerticalCardProduct category={"ChestArm"} heading={"Top Chest & Arm Exercise Equipments"}/>
      <VerticalCardProduct category={"CoreFit"} heading={"Top Core Exercise Equipments"}/>
      <VerticalCardProduct category={"GripMax"} heading={"Top Hand Grippers"}/>
      <VerticalCardProduct category={"Gymnastics"} heading={"Top Gymnastic Equipments"}/>
      <VerticalCardProduct category={"LegFlex"} heading={"Top Leg Exercise Equipments"}/>
      <VerticalCardProduct category={"PunchBag"} heading={"Top Punching Bags"}/>
      <VerticalCardProduct category={"PushBars"} heading={"Top PushUp Bars"}/>
      <VerticalCardProduct category={"Shakers"} heading={"Best Shakers For Gym Use"}/>
      <VerticalCardProduct category={"Supplement"} heading={"Top Supplements"}/>
      <VerticalCardProduct category={"WeightLift"} heading={"Top Weights For Lifting"}/>
    </div>
  )
}

export default Home