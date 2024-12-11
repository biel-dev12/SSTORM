import { useEffect, useState } from "react";
import { fetchSegments } from "../../api/segmentService";
import { toast } from "react-toastify";

const SegmentList = ({ value, onChange }) => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSegments = async () => {
      try {
        const segmentsData = await fetchSegments();
        setSegments(segmentsData);
      } catch (error) {
        toast.error("Erro ao carregar segmentos");
      } finally {
        setLoading(false);
      }
    };

    loadSegments();
  }, []);

  return (
    <select
      name="segment"
      id="segment"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        Selecione um segmento
      </option>
      {loading ? (
        <option value="loading">Carregando...</option>
      ) : segments.length > 0 ? (
        segments.map((segment) => (
          <option
            key={segment.id_segment}
            value={segment.id_segment}
          >
            {segment.nm_segment}
          </option>
        ))
      ) : (
        <option value="no-segments">Segmentos não encontrados</option>
      )}
    </select>
  );
};

export default SegmentList;
