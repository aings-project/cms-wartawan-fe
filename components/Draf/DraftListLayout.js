import React, { useEffect, useState } from 'react';
import Sidebar from "@/components/Sidebar/SidebarMain";
import ListItem from "@/components/ListItem/ListItem";
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getDraftList } from '@/states/draft_list/action';
import ReactLoading from 'react-loading';

export default function DraftListLayout() {

  const router = useRouter()

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch();
  const draft_list = useSelector((state) => state.draft_list);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getDraftList({
      "page": page, "limit": 6,
      onSuccess: (value) => {
        setTotalPage(value.total_pages);
        setIsLoading(false);
      },
    }));
  }, [dispatch, page]);

  const draft_list_shown = draft_list?.draft_berita
    ? draft_list.draft_berita
    : [];

  const handleViewDraf = (id) => {
    router.push(`/draf/${id}`)
  };

  const handleNextPage = () => {
    if (page !== totalPage) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  if (!draft_list) {
    return (<div></div>)
  }

  return (
    <main className="flex md:flex-row flex-col min-h-screen w-full bg-blue-50">
      <Sidebar />
      <div className='flex flex-col self-stretch items-start content-start md:p-16 p-8 w-full bg-blue-50 max-h-screen'>
        <h1 className='font-heading text-5xl font-bold pb-8 self-stretch text-black'>Daftar Draf Berita</h1>
        <div className='flex flex-col min-h-[360] self-stretch items-start content-start 
                        gap-3 rounded-md bg-white border-2 border-blue-400 overflow-hidden'>

          <div className='flex flex-col py-5 px-8 bg-blue-200 self-stretch'>
            <h1 className='font-heading text-xl font-bold self-stretch text-black'>Semua Draf Berita</h1>
          </div>

          {
            isLoading
              ? <div className='flex flex-1 flex-col items-center self-stretch overflow-y-auto p-10'>
                <ReactLoading type={"spin"} color={"blue"} height={'10%'} width={'10%'} />
              </div>
              : (
                ((draft_list_shown).length === 0)
                  ? <div className='flex flex-col items-start self-stretch overflow-y-auto'>
                    <p className='font-body text-lg py-10 px-8 italic text-black self-center'>Belum ada berita.</p>
                  </div>
                  : <>
                    <div className='flex flex-col items-start self-stretch overflow-y-auto'>
                      {(draft_list_shown).map((draft) => (
                        <ListItem key={draft.draft_id} title={draft.title} status={draft.status} time={draft.created_at}
                          onClick={() => handleViewDraf(draft.draft_id)} />
                      ))}
                    </div>
                    <div className='flex flex-row py-5 gap-5 items-center self-stretch justify-center border-t-2 border-gray-200'>
                      <p className={(page === 1)
                        ? 'font-body font-bold'
                        : 'font-body font-bold text-black hover:cursor-pointer hover:text-blue-500 hover:underline hover:decoration-blue-500'}
                        onClick={handlePrevPage}>Sebelumnya</p>
                      <p className='font-body font-bold'>
                        <span className='text-blue-600'>{page}</span>/{totalPage}</p>
                      <p className={(page === totalPage)
                        ? 'font-body font-bold'
                        : 'font-body font-bold text-black hover:cursor-pointer hover:text-blue-500 hover:underline hover:decoration-blue-500'}
                        onClick={handleNextPage}>Berikutnya</p>
                    </div>
                  </>)
          }

        </div>
      </div>
    </main>
  );
}