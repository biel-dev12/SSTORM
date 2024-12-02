import { useEffect, useState } from "react";
import { fetchSegments } from "../../api/segmentService";
import { toast } from "react-toastify";

const SegmentList = () => {
    const [segments, setSegments] = useState([]) 
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const loadSegments = async () => {
            try {
                const segmentsData = await fetchSegments()
                setSegments(segmentsData)
            }
            catch(error){
                toast.error("Erro ao carregar segmentos")
            }
            finally{
                setLoading(false)
            }
        }

        loadSegments()
    }, [])

    return (
        <select name="segments" id="segments">
            {loading ? (
                <option value="loading">Carregando...</option>
            ) : (
                segments.length > 0 ? (
                    segments.map((segment) => (
                        <option value={segment.nm_segment} key={segment.id_segment}>{segment.nm_segment}</option>
                    ))
                ) : (
                    <option value="no-segments">Segmentos não encontrados</option>
                )
            )
            
            }
        </select>
    )
}

export default SegmentList
