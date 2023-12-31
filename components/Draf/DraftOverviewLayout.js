import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar/SidebarMain';
import ListItem from '@/components/ListItem/ListItem';
import { useRouter } from 'next/navigation';
import useRequireAuth from '@/hooks/useRequireAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getDraftList } from '@/states/draft_list/action';
import ReactLoading from 'react-loading';

export default function DraftOverviewLayout() {

    const auth = useRequireAuth();
    const router = useRouter();

    const draft_list = useSelector((state) => state.draft_list);
    const dispatch = useDispatch();

    const [totalPage, setTotalPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getDraftList({
            "page": 1, "limit": 2,
            onSuccess: (value) => {
                setTotalPage(value.total_pages);
                setIsLoading(false);
            },
        }));
    }, [dispatch]);

    const handleViewDraf = (id) => {
        router.push(`/draf/${id}`)
    };

    if (!draft_list) {
        return (<div></div>);
    }

    return (
        <main className="flex flex-row min-h-screen w-full bg-blue-50">

            <Sidebar />

            <div className='flex flex-col items-start content-start p-20 w-4/5 '>
                <h1 className='font-heading text-5xl font-bold pb-8 self-stretch text-black'>Overview</h1>

                <div className='flex flex-col self-stretch gap-2'>

                    <div className='flex flex-col rounded-md bg-white border-2 border-blue-400 overflow-hidden'>
                        <div className='flex flex-col py-5 px-8 bg-blue-200'>
                            <h1 className='font-heading text-xl font-bold self-stretch text-black'>Draf Berita Terbaru</h1>
                        </div>
                        {
                            isLoading
                                ? <div className='flex flex-1 flex-col items-center self-stretch overflow-y-auto p-10'>
                                    <ReactLoading type={"spin"} color={"blue"} height={'10%'} width={'10%'} />
                                </div>
                                : <div className='flex flex-col py-3 self-stretch items-start content-start'>
                                    {(draft_list.draft_berita).map((draft) => (
                                        <ListItem key={draft.draft_id} title={draft.title} status={draft.status} time={draft.created_at}
                                            onClick={() => handleViewDraf(draft.draft_id)} />
                                    ))}
                                </div>}
                    </div>

                    <div className='flex flex-col rounded-md bg-white border-2 border-blue-400 overflow-hidden'>
                        <div className='flex flex-col py-5 px-8 bg-blue-200'>
                            <h1 className='font-heading text-xl font-bold self-stretch text-black'>Aktivitas Terbaru</h1>
                        </div>
                        <p className='font-body text-md py-5 px-8 italic text-black self-center'>Belum ada aktivitas terbaru.</p>
                    </div>

                </div>

            </div>

        </main>
    )
}