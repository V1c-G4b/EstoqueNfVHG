import {
  BarChart3,
  Command,
  FileText,
  Frame,
  Home,
  LifeBuoy,
  Package,
  PieChart,
  Send,
  Settings2,
  Users,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import {
  appRoutes,
  configuracoesRoutes,
  dashboardRoutes,
  estoqueRoutes,
  notasFiscaisRoutes,
  usuariosRoutes,
} from "@/shared/constants";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "Usuário",
    email: "usuario@vhg.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: dashboardRoutes.home,
      icon: Home,
      isActive: true,
    },
    {
      title: "Estoque",
      url: estoqueRoutes.list,
      icon: Package,
      items: [
        {
          title: "Produtos",
          url: estoqueRoutes.list,
        },
        {
          title: "Novo Produto",
          url: estoqueRoutes.create,
        },
        {
          title: "Transferências",
          url: estoqueRoutes.transferencias,
        },
        {
          title: "Unidades",
          url: estoqueRoutes.unidades,
        },
      ],
    },
    {
      title: "Notas Fiscais",
      url: notasFiscaisRoutes.list,
      icon: FileText,
      items: [
        {
          title: "Emitir NF",
          url: notasFiscaisRoutes.emitir,
        },
        {
          title: "Consultar NF",
          url: notasFiscaisRoutes.consultar,
        },
      ],
    },
    {
      title: "Usuários",
      url: usuariosRoutes.list,
      icon: Users,
    },
    {
      title: "Configurações",
      url: configuracoesRoutes.home,
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: appRoutes.suporte,
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: appRoutes.feedback,
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Relatórios",
      url: appRoutes.relatorios,
      icon: BarChart3,
    },
    {
      name: "Análise de Vendas",
      url: appRoutes.analiseVendas,
      icon: PieChart,
    },
    {
      name: "Controle de Qualidade",
      url: appRoutes.qualidade,
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="h-screen border-r border-sidebar-border" {...props}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="h-12">
              <a href="#" className="flex items-center gap-3">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                  <Command className="size-5" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-semibold text-base">
                    VHG Estoque
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    Sistema de Gestão
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex flex-col py-2">
        <div className="flex-1 space-y-1">
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
        </div>
        <div className="mt-auto border-t border-sidebar-border pt-2">
          <NavSecondary items={data.navSecondary} />
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
