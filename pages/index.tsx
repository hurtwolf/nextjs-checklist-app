import type { NextPage } from 'next'
import { observer } from 'mobx-react'
import { useStore } from '../stores/Root'
import Container from '../components/Container'
import CheckList from '../components/CheckList'
import { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

const Home: NextPage = () => {
  const { CheckListStore } = useStore()
  const { checklist, getList } = CheckListStore
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    getList()
  }, [CheckListStore])

  const filteredItems = checklist.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function matchPerc(){
    var matches = checklist.filter(p => p.checked === true)
    const percentage = Math.trunc((matches.length / checklist.length * 100))

    if(isNaN(Math.trunc((matches.length / checklist.length * 100)))) return 0
    return percentage
  }

  return (
    <Container>
      <div>
        <div>
          <div className='flex justify-between font-medium text-lg'>
            <p className='mb-3'>
              {!checklist.length && checklist.length + ' Items'}
              {checklist.length === 1 && checklist.length + ' Item'}
              {checklist.length > 1 && checklist.length + ' Items'}
            </p>
            <p>{matchPerc() + '%'} / 100%</p>
          </div>
          <div className='relative mb-6'>
            <input 
            type="search" 
            placeholder='Search list...' 
            className='block p-3 px-4 w-full bg-slate-500 placeholder:text-slate-200'
            onChange={(e) => setSearchValue(e.target.value)}
            />
            <HiOutlineSearch className='absolute w-6 h-6 right-3 top-3' />
          </div>
          {filteredItems.map((list) => {
            return (
              <CheckList key={list.id} list={list} />
            )
          })}
        </div>
        {!checklist.length && 
          <p className='text-center text-xl text-slate-300 my-8'>You have no Items.</p>
        }
      </div>
    </Container>
  )
}

export default observer(Home)
