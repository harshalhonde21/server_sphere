package com.consumer.Consumer_Project.repository;

import com.consumer.Consumer_Project.modal.DataTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface DataTableRepo extends JpaRepository<DataTable,String> {
}
