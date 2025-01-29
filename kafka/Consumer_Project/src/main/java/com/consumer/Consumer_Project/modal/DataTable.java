package com.consumer.Consumer_Project.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "mydatabase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DataTable {

    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    private String request;
    private String response;

}
