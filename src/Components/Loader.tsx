
const Loader = () => {
  return (
    <div>Loading...    </div>
  )
}
export default Loader

export const Skeleton=({width="unset" , count=3}:{width?:string , count?:number})=>{
  const skel = Array.from({length:count},(v,idx)=><div key={idx} className="skeleton-shape"></div>)
  return <div className="skeleton-loader" style={{width}}>
    {skel}
  </div>
}