import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      {
          Array(10).fill(0).map((c,i) => (
            <div key={i} className='flex flex-row items-center justify-between'>
            <div className="flex items-center space-x-4" >
            <span className=''> {i+1}. </span>
            <img src='/1.png' className='h-12 w-12 rounded-md' />
            <div>
              <p className='text-sm font-semibold'>Pizza + Pizza Gratuit</p>
              
            </div>
            </div>
            <div className='h-11 w-11 border-2 border-green-500 rounded-full flex items-center justify-center' >
                <span className='text-green-500 font-semibold text-xs' >70%</span>
              </div>
            </div>
          ))
          }
    </div>
  );
}
