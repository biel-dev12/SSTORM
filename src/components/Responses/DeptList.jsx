import { useEffect, useState } from "react";
import { fetchDept } from "../../api/deptService.js";
import { toast } from "react-toastify";

const DeptList = ({ selectedDept, onDeptChange }) => {
    const [depts, setDepts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDepts = async () => {
            try {
                const deptsData = await fetchDept();
                setDepts(deptsData);
            } catch (error) {
                toast.error("Erro ao carregar os departamentos");
            } finally {
                setLoading(false);
            }
        };

        loadDepts();
    }, []);

    const handleDeptChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue !== "default") {
            onDeptChange(selectedValue);
        }
    };

    return (
        <select name="dept" id="dept" value={selectedDept || "default"} onChange={handleDeptChange}>
            <option value="default" disabled>Selecione:</option>
            {loading ? (
                <option value="loading">Carregando...</option>
            ) : (
                depts.length > 0 ? (
                    depts.map((dept) => (
                        <option value={dept.id_segment} key={dept.id_dept}>
                            {dept.nm_dept}
                        </option>
                    ))
                ) : (
                    <option value="no-depts">Nenhum departamento encontrado</option>
                )
            )}
        </select>
    );
};

export default DeptList;
